// Patch Next.js generate-build-id bug where generateBuildId config is stripped
// by normalizeConfig but the build code still calls it as a function
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'build', 'generate-build-id.js');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = 'let buildId = await generate();';
  const patched = "let buildId = typeof generate === 'function' ? await generate() : null;";

  if (content.includes(original)) {
    content = content.replace(original, patched);
    fs.writeFileSync(filePath, content);
    console.log('Patched next/dist/build/generate-build-id.js');
  } else {
    console.log('generate-build-id.js already patched or changed');
  }
}
