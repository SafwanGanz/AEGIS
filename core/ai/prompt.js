export function buildReviewPrompt(code, filePath) {
  return `You are a strict code reviewer. Review the following JavaScript code and return the complete, improved file.

CRITICAL RULES:
1. DO NOT add comments or explanations.
2. DO NOT add console.log statements.
3. DO NOT change behavior or logic.
4. ONLY improve performance and security.
5. Remove or replace dangerous patterns (eval, Function constructor, sync fs operations).
6. Replace synchronous fs operations with async equivalents.
7. Remove console statements if present.
8. Keep all existing formatting and structure as much as possible.
9. Return ONLY the complete corrected file code, nothing else.
10. Return raw JavaScript with NO markdown fences or labels.

File: ${filePath}

Code to review:
\`\`\`javascript
${code}
\`\`\`

Return ONLY the complete corrected JavaScript code:`;
}

export function extractCode(response) {
  const trimmed = response.trim();

  const fencedMatch = trimmed.match(/```(?:javascript|js)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch && fencedMatch[1].trim()) {
    return fencedMatch[1].trim();
  }

  const unfenced = trimmed
    .replace(/^```(?:javascript|js)?/i, '')
    .replace(/```$/, '')
    .trim();

  if (unfenced) {
    return unfenced;
  }

  const backtickStripped = trimmed.replace(/^`+/, '').replace(/`+$/, '').trim();
  if (backtickStripped) {
    return backtickStripped;
  }

  throw new Error('Failed to extract code from Ollama response');
}
