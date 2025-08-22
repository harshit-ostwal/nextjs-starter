#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, copyFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "my-app";
const projectPath = path.resolve(process.cwd(), projectName);

if (existsSync(projectPath)) {
  console.error(`❌ Folder "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`🚀 Creating Next.js app in "${projectName}"...`);
mkdirSync(projectPath);

// Copy template files
const templateDir = path.join(__dirname, "../template");
execSync(`cp -r ${templateDir}/* ${projectPath}`);

// Init git
execSync("git init", { cwd: projectPath, stdio: "inherit" });

// Install deps
console.log("📦 Installing dependencies...");
execSync("npm install", { cwd: projectPath, stdio: "inherit" });

console.log(`✅ Done! cd ${projectName} && npm run dev`);
