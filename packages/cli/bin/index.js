#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import ora from "ora";
import { fileURLToPath } from "url";

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
    "Small–Mid (Layered)": path.join(language === "JavaScript" ? "js" : "ts", "small"),
    "Mid–Large (Modular)": path.join(language === "JavaScript" ? "js" : "ts", "modular"),
  };

  const templateFolder = templateMap[architecture];

  // Windows-friendly path fix
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Repo root is two levels above packages/cli
  const repoRoot = path.resolve(__dirname, "../../..");
  const templatePath = path.join(repoRoot, "templates", templateFolder);

  const targetPath = path.resolve(process.cwd(), projectName);

  const spinner = ora("Copying template...").start();

  try {
    // Copy template
    fs.copySync(templatePath, targetPath, { overwrite: true });
    spinner.succeed("Template copied successfully!");

    // -----------------------------
    // ✅ Fix package.json dynamically
    // -----------------------------
    const pkgPath = path.join(targetPath, "package.json");

    if (fs.existsSync(pkgPath)) {
      const pkg = fs.readJsonSync(pkgPath);

      // Set project name
      pkg.name = projectName.toLowerCase().replace(/\s+/g, "-");

      // Reset version
      pkg.version = "1.0.0";

      // Remove template-only fields
      delete pkg.private;
      delete pkg.repository;
      delete pkg.bugs;
      delete pkg.homepage;

      fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
    }

    // Install dependencies
    process.chdir(targetPath);
    const installSpinner = ora(`Installing dependencies using ${packageManager}...`).start();
    execSync(`${packageManager} install`, { stdio: "inherit" });
    installSpinner.succeed("Dependencies installed successfully!");

    console.log(chalk.green(`\n✅ Project ${projectName} is ready!`));
    console.log(chalk.cyan(`\nNext steps:`));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  ${packageManager} run dev\n`));
  } catch (err) {
    spinner.fail("Failed to create project.");
    console.error(err);
  }
}

run();