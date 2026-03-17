// Build script that patches Next.js and cleans polluted env vars
const { execSync } = require('child_process');

// Patch Next.js
require('./patch-next.js');

// Clean polluted env vars from other projects
delete process.env.__NEXT_PRIVATE_STANDALONE_CONFIG;
delete process.env.__NEXT_PRIVATE_ORIGIN;
delete process.env.NEXT_DEPLOYMENT_ID;

// Run next build
try {
  execSync('npx next build', { stdio: 'inherit', env: process.env });
} catch (e) {
  process.exit(1);
}
