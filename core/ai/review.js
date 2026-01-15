import { OllamaEngine } from '../../engines/ollama.js';
import { JsScanner } from '../scanner/js.js';
import { buildReviewPrompt, extractCode } from './prompt.js';

export class CodeReviewer {
  constructor() {
    this.engine = new OllamaEngine();
    this.scanner = new JsScanner();
  }
  
  async review(code, filePath) {
    const staticIssues = this.scanner.scan(code);
    
    const prompt = buildReviewPrompt(code, filePath);
    const rawResponse = await this.engine.generate(prompt);
    const reviewedCode = extractCode(rawResponse);
    
    return {
      original: code,
      reviewed: reviewedCode,
      staticIssues,
      filePath
    };
  }
}
