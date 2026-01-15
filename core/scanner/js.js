export class JsScanner {
  scan(code) {
    const issues = [];
    
    if (this.detectEval(code)) {
      issues.push({ type: 'eval', severity: 'critical' });
    }
    
    if (this.detectFunctionConstructor(code)) {
      issues.push({ type: 'functionConstructor', severity: 'critical' });
    }
    
    if (this.detectSyncFs(code)) {
      issues.push({ type: 'syncFs', severity: 'high' });
    }
    
    if (this.detectAntiPatterns(code)) {
      issues.push({ type: 'antiPatterns', severity: 'medium' });
    }
    
    return issues;
  }
  
  detectEval(code) {
    return /\beval\s*\(/.test(code);
  }
  
  detectFunctionConstructor(code) {
    return /new\s+Function\s*\(/.test(code) || /Function\s*\([^)]*\)/.test(code);
  }
  
  detectSyncFs(code) {
    const syncMethods = [
      'readFileSync',
      'writeFileSync',
      'appendFileSync',
      'readdirSync',
      'statSync',
      'unlinkSync',
      'mkdirSync',
      'rmdirSync'
    ];
    
    const pattern = new RegExp(`\\b(?:${syncMethods.join('|')})\\s*\\(`, 'g');
    return pattern.test(code);
  }
  
  detectAntiPatterns(code) {
    const antiPatterns = [
      /console\.(log|warn|error|debug|info)\s*\(/,
      /var\s+\w+\s*=\s*global/,
      /setTimeout\s*\(\s*function|setInterval\s*\(\s*function/,
      /require\s*\(\s*['"][^'"]+\.\.\/\.\.[^'"]*['"]\s*\)/,
      /process\.exit\s*\(/
    ];
    
    return antiPatterns.some(pattern => pattern.test(code));
  }
}
