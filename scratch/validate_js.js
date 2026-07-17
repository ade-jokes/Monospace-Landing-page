import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level to reach project root
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Match all scripts
const matches = htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g);
for (const match of matches) {
  const scriptContent = match[1];
  console.log('Found script tag of length:', scriptContent.length);
  try {
    new vm.Script(scriptContent);
    console.log('-> Script syntax is VALID.');
  } catch (err) {
    console.error('-> Script syntax ERROR:', err);
  }
}
