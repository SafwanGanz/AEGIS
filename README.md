# AEGIS - Offline AI Code Reviewer

A production-grade offline AI code reviewer CLI tool powered by Ollama.

## Installation

```bash
npm install
```

## Usage

```bash
# Review a single JavaScript file
node cli.js review path/to/file.js

# Review all JavaScript files in a directory
node cli.js review path/to/directory

# Using the binary directly
./bin/aegis review path/to/file.js
```

## Requirements

- Node.js 18+
- Ollama running locally (http://localhost:11434/api/generate)
- A compatible model: deepseek-coder or codellama

## Features

- Works fully offline with Ollama
- AST-based static scanning for common issues
- AI-powered deep code review
- Generates clean unified diffs
- No automatic file modifications
- Production-quality implementation

## Review Output

The tool outputs unified diffs for files that require improvements:
- Performance optimizations (async/await, lazy loading)
- Security fixes (removes dangerous patterns like eval, Function constructor)
- Replaces synchronous fs operations with async variants

