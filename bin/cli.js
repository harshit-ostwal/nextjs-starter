#!/usr/bin/env node
import fs from "fs";
import path from "path";

const projectName = process.argv[2] || "my-app";
const targetDir = path.join(process.cwd(), projectName);

fs.cpSync(path.join(__dirname, "../template"), targetDir, { recursive: true });

console.log(`✅ Project created at ${projectName}`);
console.log(`👉 cd ${projectName} && pnpm install && pnpm dev`);
