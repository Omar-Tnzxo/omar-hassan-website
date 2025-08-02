import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting custom build process...');

// Check if src/main.tsx exists
const mainTsxPath = path.join(__dirname, 'src', 'main.tsx');
if (!fs.existsSync(mainTsxPath)) {
  console.error('Error: src/main.tsx not found!');
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