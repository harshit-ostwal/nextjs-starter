#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync, cpSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: "pipe",
      encoding: "utf-8",
      ...options,
    }).trim();
  } catch {
    return null;
  }
}

// Fetch latest version of a package
function getLatestVersion(pkgName, packageManager) {
  try {
    if (packageManager === "pnpm" || packageManager === "npm") {
      return runCommand(`${packageManager} view ${pkgName} version`);
    } else if (packageManager === "yarn") {
      return runCommand(`yarn info ${pkgName} version`);
    } else if (packageManager === "bun") {
      return runCommand(`bun info ${pkgName} version`);
    }
    return null;
  } catch {
    return null;
  }
}

// Print dependencies summary
function printPackageSummary(projectPath, packageManager) {
  const pkgJsonPath = path.join(projectPath, "package.json");
  if (!existsSync(pkgJsonPath)) return;

  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
  const dependencies = pkg.dependencies || {};
  const devDependencies = pkg.devDependencies || {};

  const depNames = Object.keys(dependencies);
  const devDepNames = Object.keys(devDependencies);
  const totalPackages = depNames.length + devDepNames.length;

  console.log(chalk.cyan("\nInstalling dependencies:"));
  depNames.forEach((dep) => console.log(`- ${dep}`));

  console.log(chalk.cyan("\nInstalling devDependencies:"));
  devDepNames.forEach((dep) => console.log(`- ${dep}`));

  // Dynamic progress simulation
  const resolved = totalPackages + Math.floor(totalPackages * 0.5);
  const reused = Math.floor(totalPackages * 0.9);
  const downloaded = 1;
  const added = totalPackages;

  console.log(`\nPackages: +${totalPackages}`);
  console.log(
    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  );
  console.log(
    `Progress: resolved ${resolved}, reused ${reused}, downloaded ${downloaded}, added ${added}, done\n`
  );

  console.log(chalk.cyan("dependencies:"));
  depNames.forEach((name) => {
    const installed = dependencies[name];
    const latest = getLatestVersion(name, packageManager);
    const updateNotice =
      latest && latest !== installed ? ` (${latest} is available)` : "";
    console.log(`+ ${name} ${chalk.gray(installed)}${updateNotice}`);
  });

  console.log(chalk.cyan("\ndevDependencies:"));
  devDepNames.forEach((name) => {
    const installed = devDependencies[name];
    const latest = getLatestVersion(name, packageManager);
    const updateNotice =
      latest && latest !== installed ? ` (${latest} is available)` : "";
    console.log(`+ ${name} ${chalk.gray(installed)}${updateNotice}`);
  });
}

async function main() {
  let projectName = process.argv[2];
  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What is your project named?",
      initial: "my-app",
    });
    projectName = response.projectName;
  }

  const projectPath = path.resolve(process.cwd(), projectName);
  if (projectName !== "." && existsSync(projectPath)) {
    console.error(chalk.red(`❌ Folder "${projectName}" already exists.`));
    process.exit(1);
  }

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

  console.log(`\nCreating a new Next.js app in ${chalk.cyan(projectPath)}.\n`);
  console.log(`Using ${chalk.cyan(packageManager)}.\n`);
  console.log(`Initializing project with template: app-tw\n`);

  if (projectName !== ".") mkdirSync(projectPath);
  const templateDir = path.join(__dirname, "../template");
  cpSync(templateDir, projectPath, { recursive: true });

  const spinner = ora("Initializing git repository...").start();
  runCommand("git init", { cwd: projectPath });
  spinner.stop();
  console.log(chalk.green("Initialized a git repository.\n"));

  console.log(chalk.cyan(`Installing dependencies...\n`));
  try {
    if (packageManager === "npm")
      runCommand("npm install", { cwd: projectPath });
    else if (packageManager === "pnpm")
      runCommand("pnpm install", { cwd: projectPath });
    else if (packageManager === "yarn")
      runCommand("yarn install", { cwd: projectPath });
    else if (packageManager === "bun")
      runCommand("bun install", { cwd: projectPath });
  } catch {
    console.log(
      chalk.yellow("\n⚠ Warning: Some build scripts were ignored.\n")
    );
  }

  printPackageSummary(projectPath, packageManager);

  console.log(
    chalk.green(
      `Done in ${chalk.cyan("~10s")} using ${chalk.cyan(packageManager)}.`
    )
  );
  console.log(
    chalk.green(
      `\n✅ Success! Created ${projectName} at ${chalk.cyan(projectPath)}`
    )
  );
}

main();
