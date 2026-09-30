import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function parseChangelog(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const releases = [];
  
  let currentRelease = null;
  let currentCategory = null;
  
  const versionRegex = /^## \[([^\]]+)\](?: - (.*))?/;
  const categoryRegex = /^### (.*)/;
  
  for (const line of lines) {
    const vMatch = line.match(versionRegex);
    if (vMatch) {
      if (currentRelease) {
        releases.push(currentRelease);
      }
      currentRelease = {
        version: vMatch[1],
        date: vMatch[2] ? vMatch[2].trim() : '',
        changes: {}
      };
      currentCategory = null;
      continue;
    }
    
    if (currentRelease) {
      const cMatch = line.match(categoryRegex);
      if (cMatch) {
        currentCategory = cMatch[1].trim();
        currentRelease.changes[currentCategory] = [];
        continue;
      }
      
      if (currentCategory && line.trim().startsWith('- ')) {
        currentRelease.changes[currentCategory].push(line.trim().substring(2));
      }
    }
  }
  
  if (currentRelease) {
    releases.push(currentRelease);
  }
  
  return releases;
}

try {
  const en = parseChangelog(path.join(rootDir, 'CHANGELOG.md'));
  const pt = parseChangelog(path.join(rootDir, 'CHANGELOG.pt-BR.md'));

  const result = {
    en,
    'pt-BR': pt
  };

  const outputPath = path.join(rootDir, 'changelog.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  
  // Copiar também para a pasta public para ser consumido pelo frontend no Showcase
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.join(publicDir, 'changelog.json');
  fs.writeFileSync(publicPath, JSON.stringify(result, null, 2));

  console.log('✅ changelog.json gerado com sucesso!');
} catch (err) {
  console.error('❌ Erro ao gerar o changelog.json:', err);
  process.exit(1);
}
