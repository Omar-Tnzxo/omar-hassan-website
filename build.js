import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting custom build process...');
console.log('Current directory:', __dirname);

// Check multiple possible paths for src/main.tsx
const possiblePaths = [
  path.join(__dirname, 'src', 'main.tsx'),
  path.join(process.cwd(), 'src', 'main.tsx'),
  path.join(__dirname, '..', 'src', 'main.tsx')
];

let mainTsxPath = null;
for (const testPath of possiblePaths) {
  console.log('Checking path:', testPath);
  if (fs.existsSync(testPath)) {
    mainTsxPath = testPath;
    console.log('Found src/main.tsx at:', mainTsxPath);
    break;
  }
}

if (!mainTsxPath) {
  console.error('Error: src/main.tsx not found in any of the expected locations!');
  console.log('Available files in current directory:');
  try {
    const files = fs.readdirSync(__dirname);
    console.log(files);
  } catch (error) {
    console.log('Could not read directory:', error.message);
  }
  process.exit(1);
}

console.log('src/main.tsx found, proceeding with build...');

try {
  // Run the build command
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 