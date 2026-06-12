const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend', 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace '/api/...' with (import.meta.env.VITE_API_URL || "") + '/api/...'
  content = content.replace(/'\/api\//g, '(import.meta.env.VITE_API_URL || "") + \'/api/');
  content = content.replace(/"\/api\//g, '(import.meta.env.VITE_API_URL || "") + \"/api/');
  content = content.replace(/`\/api\//g, '`${import.meta.env.VITE_API_URL || ""}/api/');
  
  fs.writeFileSync(filePath, content);
});

console.log('Frontend fetch URLs updated correctly.');
