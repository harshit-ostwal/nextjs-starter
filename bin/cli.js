#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync, cpSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch {
    console.error(chalk.red(`❌ Failed to run: ${command}`));
    process.exit(1);
  }
}

async function main() {
  // Step 1: Ask for project name
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "What is your project named?",
    initial: "my-app",
  });

  const projectPath = path.resolve(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    console.error(chalk.red(`❌ Folder "${projectName}" already exists.`));
    process.exit(1);
  }

  // Step 2: Ask for package manager
  const { packageManager } = await prompts({
    type: "select",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: [
      { title: "pnpm (recommended)", value: "pnpm" },
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "bun", value: "bun" },
    ],
    initial: 0,
  });

  // Step 3: Start spinner
  const spinner = ora(
    `Creating Next.js app in ${chalk.cyan(projectName)}...`
  ).start();

  mkdirSync(projectPath);

  // Copy template files (keeps empty folders too)
  const templateDir = path.join(__dirname, "../template");
  cpSync(templateDir, projectPath, { recursive: true });

  // Init git
  spinner.text = "Initializing Git repository...";
  runCommand("git init", { cwd: projectPath });

  spinner.stop();

  // Step 4: Install dependencies
  console.log(
    chalk.cyan(`📦 Installing dependencies with ${packageManager}...`)
  );

  if (packageManager === "npm") {
    runCommand("npm install", { cwd: projectPath });
  } else if (packageManager === "pnpm") {
    runCommand("pnpm install", { cwd: projectPath });
  } else if (packageManager === "yarn") {
    runCommand("yarn install", { cwd: projectPath });
  } else if (packageManager === "bun") {
    runCommand("bun install", { cwd: projectPath });
  }

  // Step 5: Success
  console.log(chalk.green("\n✅ Success!"));
  console.log(`\nNext steps:\n`);
  console.log(`  ${chalk.cyan("cd")} ${projectName}`);
  console.log(`  ${chalk.cyan(`${packageManager} dev`)}\n`);
}

main();
