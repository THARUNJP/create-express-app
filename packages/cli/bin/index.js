#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import ora from "ora";

async function run() {
  console.log(chalk.cyan("\n🚀 Create Express App\n"));

  const answers = await inquirer.prompt([
    { type: "input", name: "projectName", message: "Project name:", default: "my-express-app" },
    { type: "list", name: "language", message: "Choose language:", choices: ["TypeScript", "JavaScript"] },
    { type: "list", name: "architecture", message: "Choose architecture:", choices: ["Small–Mid (Layered)", "Mid–Large (Modular)"] },
    { type: "list", name: "packageManager", message: "Package manager:", choices: ["npm", "pnpm", "yarn"] },
  ]);

  const { projectName, language, architecture, packageManager } = answers;

  // Map selections to template folders
  const templateMap = {
    "Small–Mid (Layered)": "ts-small-mid",
    "Mid–Large (Modular)": "ts-mid-large",
  };

  const templateFolder =
    language === "JavaScript" ? templateMap[architecture].replace("ts-", "js-") : templateMap[architecture];

  const templatePath = path.resolve(new URL(import.meta.url).pathname, "../../templates", templateFolder);
  const targetPath = path.resolve(process.cwd(), projectName);

  const spinner = ora("Copying template...").start();
  try {
    fs.copySync(templatePath, targetPath, { overwrite: true });
    spinner.succeed("Template copied successfully!");

    process.chdir(targetPath);
    const installSpinner = ora(`Installing dependencies using ${packageManager}...`).start();
    execSync(`${packageManager} install`, { stdio: "inherit" });
    installSpinner.succeed("Dependencies installed successfully!");

    console.log(chalk.green(`\n✅ Project ${projectName} is ready!`));
    console.log(chalk.cyan(`\ncd ${projectName} && ${packageManager} run dev`));
  } catch (err) {
    spinner.fail("Failed to create project.");
    console.error(err);
  }
}

run();