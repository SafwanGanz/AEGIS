export const config = {
  ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434/api/generate',
  ollamaModel: process.env.OLLAMA_MODEL || 'codegemma:2b',
  timeout: 120000,
  staticChecks: {
    eval: true,
    functionConstructor: true,
    syncFs: true,
    antiPatterns: true
  }
};
