#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync, cpSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2] || "my-app";
const projectPath = path.resolve(process.cwd(), projectName);

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch (err) {
    console.error(chalk.red(`❌ Failed to run: ${command}`));
    process.exit(1);
  }
}

// Ask user a question (sync-like prompt)
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  // Check if project folder already exists
  if (existsSync(projectPath)) {
    console.error(chalk.red(`❌ Folder "${projectName}" already exists.`));
    process.exit(1);
  }

  const spinner = ora(
    `Creating Next.js app in ${chalk.cyan(projectName)}...`
  ).start();

  // Create dir + copy template
  mkdirSync(projectPath);
  const templateDir = path.join(__dirname, "../template");
  cpSync(templateDir, projectPath, { recursive: true });

  // Init git
  spinner.text = "Initializing Git repository...";
  runCommand("git init", { cwd: projectPath });

  spinner.stop();

  // Ask for package manager
  const pm = (
    await askQuestion(
      chalk.yellow(
        "👉 Which package manager do you want to use? (npm / pnpm / yarn / bun): "
      )
    )
  ).toLowerCase();

  const validPMs = ["npm", "pnpm", "yarn", "bun"];
  if (!validPMs.includes(pm)) {
    console.error(chalk.red(`❌ Invalid choice: ${pm}`));
    process.exit(1);
  }

  console.log(chalk.cyan(`📦 Installing dependencies with ${pm}...`));

  // Run correct install
  if (pm === "npm") {
    runCommand("npm install", { cwd: projectPath });
  } else if (pm === "pnpm") {
    runCommand("pnpm install", { cwd: projectPath });
  } else if (pm === "yarn") {
    runCommand("yarn install", { cwd: projectPath });
  } else if (pm === "bun") {
    runCommand("bun install", { cwd: projectPath });
  }

  console.log(chalk.green("\n✅ Success!"));
  console.log(`\nNext steps:\n`);
  console.log(`  ${chalk.cyan("cd")} ${projectName}`);
  console.log(`  ${chalk.cyan(`${pm} dev`)}\n`);
}

main();
