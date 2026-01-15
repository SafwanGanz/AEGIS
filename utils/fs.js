import { glob } from 'glob';
import { promises as fsPromises, readFileSync, existsSync, statSync } from 'fs';
import { resolve } from 'path';

export async function getJsFiles(path) {
  const fullPath = resolve(path);
  
  if (!existsSync(fullPath)) {
    throw new Error(`Path does not exist: ${path}`);
  }
  
  const stats = statSync(fullPath);
  
  if (stats.isFile()) {
    if (!fullPath.endsWith('.js')) {
      throw new Error(`File must be a JavaScript file: ${path}`);
    }
    return [fullPath];
  }
  
  if (stats.isDirectory()) {
    const pattern = `${fullPath}/**/*.js`;
    const files = await glob(pattern);
    return files.sort();
  }
  
  throw new Error(`Invalid path type: ${path}`);
}

export function readFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

export async function writeFile(filePath, content) {
  await fsPromises.writeFile(filePath, content, 'utf8');
}

export function getFileName(filePath) {
  return filePath.split('/').pop();
}
