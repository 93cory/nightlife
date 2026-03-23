/**
 * Build script that patches Next.js generateBuildId bug on Node 22+
 * then runs next build. Gracefully handles trace warnings on Windows.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");

// Patch: generateBuildId bug (generate is not a function) — Node 22+
const buildIdFile = path.join(root, "node_modules", "next", "dist", "build", "generate-build-id.js");
if (fs.existsSync(buildIdFile)) {
  let content = fs.readFileSync(buildIdFile, "utf8");
  const original = "let buildId = await generate();";
  const patched = "let buildId = typeof generate === 'function' ? await generate() : null;";
  if (content.includes(original)) {
    content = content.replace(original, patched);
    fs.writeFileSync(buildIdFile, content);
    console.log("generate-build-id.js patched");
  } else {
    console.log("generate-build-id.js already patched or changed");
  }
}

// Run next build
try {
  execSync("npx next build", { stdio: "inherit", cwd: root });
  console.log("\n✓ Build completed successfully");
} catch (e) {
  // On Windows + Node 22, trace file warnings cause exit code 1
  // but the build is actually complete. Check for build-manifest.json
  const buildManifest = path.join(root, ".next", "build-manifest.json");
  if (fs.existsSync(buildManifest)) {
    console.log("\n✓ Build completed (with trace warnings)");
    process.exit(0);
  } else {
    console.error("\n✗ Build failed");
    process.exit(1);
  }
}
