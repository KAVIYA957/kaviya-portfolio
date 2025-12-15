const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = path.join(__dirname, '../src');
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

// Get all TypeScript and JavaScript files
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (IGNORE_DIRS.includes(file)) {
      return;
    }
    
    if (stat.isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Convert @/ imports to relative paths
function updateImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  
  // Find all @/ imports
  const importRegex = /from\s+['"]@\/([^'"]+)['"]/g;
  let match;
  let updatedContent = content;
  
  while ((match = importRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const importPath = match[1];
    
    // Calculate relative path
    const relativePath = path.relative(dir, path.join(SRC_DIR, importPath));
    const newImport = `from '${relativePath.startsWith('.') ? relativePath : './' + relativePath}'`;
    
    // Replace in content
    updatedContent = updatedContent.replace(fullMatch, newImport);
  }
  
  // Write back if changes were made
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated imports in ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Update Vite config
function updateViteConfig() {
  const configPath = path.join(__dirname, '../vite.config.ts');
  let config = fs.readFileSync(configPath, 'utf8');
  
  // Remove alias configuration
  config = config.replace(/\s*resolve:\s*{\s*alias:\s*{[^}]*},\s*},?/g, '');
  
  fs.writeFileSync(configPath, config, 'utf8');
  console.log('Updated vite.config.ts');
}

// Update tsconfig.json
function updateTsConfig() {
  const tsConfigPath = path.join(__dirname, '../tsconfig.json');
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  
  // Remove paths configuration
  if (tsConfig.compilerOptions.paths) {
    delete tsConfig.compilerOptions.paths;
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2), 'utf8');
    console.log('Updated tsconfig.json');
  }
}

// Main function
function main() {
  console.log('Updating imports to use relative paths...');
  
  // Get all files
  const files = getFiles(SRC_DIR);
  let updatedCount = 0;
  
  // Update imports in all files
  files.forEach(file => {
    if (updateImports(file)) {
      updatedCount++;
    }
  });
  
  // Update config files
  updateViteConfig();
  updateTsConfig();
  
  console.log(`\n✅ Successfully updated imports in ${updatedCount} files`);
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev (to test locally)');
  console.log('2. Run: npm run build (to verify production build)');
  console.log('3. Run: git add . && git commit -m "fix: update imports to relative paths"');
  console.log('4. Run: npm run deploy (to deploy changes)');
}

// Run the script
main();
