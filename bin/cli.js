#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "my-app";
const targetDir = path.join(process.cwd(), projectName);

fs.cpSync(path.join(__dirname, "../template"), targetDir, { recursive: true });

console.log(`✅ Project created at ${projectName}`);
console.log(`👉 cd ${projectName} && pnpm install && pnpm dev`);
