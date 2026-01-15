import https from 'https';
import http from 'http';
import { config } from '../core/config.js';

export class OllamaEngine {
  async generate(prompt) {
    return new Promise((resolve, reject) => {
      const url = new URL(config.ollamaUrl);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const requestBody = JSON.stringify({
        model: config.ollamaModel,
        prompt,
        stream: false,
        temperature: 0.3,
        top_p: 0.9
      });
      
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        },
        timeout: config.timeout
      };
      
      const req = client.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Ollama API error: ${res.statusCode} ${data}`));
            return;
          }
          
          try {
            const response = JSON.parse(data);
            resolve(response.response || '');
          } catch (error) {
            reject(new Error(`Failed to parse Ollama response: ${error.message}`));
          }
        });
      });
      
      req.on('error', (error) => {
        reject(new Error(`Ollama request failed: ${error.message}`));
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Ollama request timeout'));
      });
      
      req.write(requestBody);
      req.end();
    });
  }
}
