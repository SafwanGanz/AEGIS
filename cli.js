import { getJsFiles, readFile, writeFile } from './utils/fs.js';
import { CodeReviewer } from './core/ai/review.js';
import { generateDiff, formatDiffOutput } from './core/diff/generate.js';

async function reviewFiles(filePaths, applyFixes) {
  const reviewer = new CodeReviewer();
  let hasOutput = false;
  
  for (const filePath of filePaths) {
    const code = readFile(filePath);
    const result = await reviewer.review(code, filePath);
    const diff = generateDiff(filePath, result.original, result.reviewed);
    
    if (diff) {
      hasOutput = true;
      process.stdout.write(`\n=== ${filePath} ===\n`);
      process.stdout.write(formatDiffOutput(filePath, diff));
      if (applyFixes) {
        await writeFile(filePath, result.reviewed);
      }
    }
  }
  
  if (!hasOutput) {
    process.stdout.write('No issues found in reviewed files.\n');
  }
}

export async function cli(args) {
  if (args.length < 2) {
    process.stderr.write('Usage: aegis review <path> [--apply|--fix]\n');
    process.stderr.write('  <path>            File or directory path to review\n');
    process.stderr.write('  --apply | --fix   Write reviewed code back to files\n');
    process.exit(1);
  }
  
  if (args[0] !== 'review') {
    process.stderr.write(`Unknown command: ${args[0]}\n`);
    process.exit(1);
  }
  
  const path = args[1];
  const flags = args.slice(2);
  const applyFixes = flags.includes('--apply') || flags.includes('--fix');
  
  try {
    const filePaths = await getJsFiles(path);
    
    if (filePaths.length === 0) {
      process.stderr.write('No JavaScript files found.\n');
      process.exit(1);
    }
    
    await reviewFiles(filePaths, applyFixes);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}
