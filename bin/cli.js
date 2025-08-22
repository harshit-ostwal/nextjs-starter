#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "my-app";
const projectPath = path.resolve(process.cwd(), projectName);

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch (err) {
    console.error(`❌ Failed to run command: ${command}`);
    process.exit(1);
  }
}

try {
  execSync("pnpm -v", { stdio: "ignore" });
} catch {
  console.error("❌ pnpm is not installed. Please install it first:");
  console.error("   npm install -g pnpm");
  process.exit(1);
}

if (existsSync(projectPath)) {
  console.error(`❌ Folder "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`🚀 Creating Next.js app in "${projectName}"...`);
mkdirSync(projectPath);

const templateDir = path.join(__dirname, "../template");
if (os.platform() === "win32") {
  runCommand(`xcopy "${templateDir}" "${projectPath}" /E /I /Q`);
} else {
  runCommand(`cp -r ${templateDir}/. ${projectPath}`);
}

runCommand("git init", { cwd: projectPath });

console.log("📦 Installing dependencies...");
runCommand("pnpm install --shamefully-hoist", { cwd: projectPath });

console.log(`\n✅ All done!`);
console.log(`👉 cd ${projectName}`);
console.log(`👉 pnpm dev (or npm run dev)\n`);