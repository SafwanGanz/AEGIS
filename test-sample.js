import { readFileSync, writeFileSync } from 'fs';

export function processData(filePath) {
  const data = readFileSync(filePath, 'utf8');
  console.log('Processing:', data.length);
  
  const result = eval('data.toUpperCase()');
  console.log('Result:', result);
  
  return result;
}

export function dynamicFunction(code) {
  const fn = new Function('x', `return ${code}`);
  return fn(42);
}

export async function saveFile(filePath, content) {
  writeFileSync(filePath, content, 'utf8');
  console.log('File saved');
}
