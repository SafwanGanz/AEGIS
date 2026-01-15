# AEGIS - Offline AI Code Reviewer

Offline-first code review CLI powered by Ollama. Scans JavaScript files for risky patterns, asks a local model for improvements, and prints a unified diff (optionally applying the patch).

## Quickstart

```bash
npm install

# Ensure Ollama is running locally
ollama pull codegemma:2b
```

## Usage

```bash
# Review a single file
node cli.js review path/to/file.js

# Review every .js file under a directory (recursive)
node cli.js review path/to/directory

# Apply the reviewed code back to disk
node cli.js review path/to/file.js --apply
node cli.js review path/to/dir --fix  # alias for --apply

# Using the packaged binary
./bin/aegis review path/to/file.js [--apply|--fix]
```

Behavior:
- Accepts a file or directory; directories expand to all `.js` files via glob.
- Prints a unified diff for each file with detected improvements.
- With `--apply`/`--fix`, writes the reviewed code back to the file.
- Exits early with a helpful message if the path is missing or not JavaScript.

## Configuration

- `OLLAMA_URL` (default: `http://localhost:11434/api/generate`)
- `OLLAMA_MODEL` (default: `codegemma:2b`)

Example:

```bash
OLLAMA_URL=http://localhost:11434/api/generate \
OLLAMA_MODEL=codellama:7b node cli.js review src
```

## Features

- Fully offline inference through local Ollama
- Static JS checks for `eval`, `Function` constructor, sync `fs` calls, and other anti-patterns
- LLM-backed rewrite that preserves behavior while improving security and performance
- Unified diff output; optional in-place apply
- Minimal prompt with strict rules (no extra comments or logging)

## How It Works

1. Discover `.js` files from a file or directory path.
2. Run static checks to flag unsafe patterns.
3. Build a constrained prompt and call the configured Ollama model.
4. Extract the returned code, generate a unified diff, and print it.
5. Optionally write the reviewed code to disk when `--apply`/`--fix` is used.

## Requirements

- Node.js 18+
- Ollama running locally with a supported code model (e.g., `codegemma:2b`, `codellama`)

