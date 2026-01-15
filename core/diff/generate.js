import { createPatch } from 'diff';

export function generateDiff(filePath, originalCode, reviewedCode) {
  if (originalCode === reviewedCode) {
    return null;
  }
  
  const originalLines = originalCode.split('\n');
  const reviewedLines = reviewedCode.split('\n');
  
  const patch = createPatch(
    filePath,
    originalCode,
    reviewedCode,
    'original',
    'reviewed',
    {
      context: 3
    }
  );
  
  return patch;
}

export function formatDiffOutput(filePath, diff) {
  if (!diff) {
    return null;
  }
  
  return `${diff}\n`;
}
