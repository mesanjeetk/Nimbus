#!/usr/bin/env node
import { execSync } from "child_process";

const args = process.argv.slice(2);
const commitMessage = args.join(" ") || "chore: update";

const packageName = "lightningcss.android-arm64.node"; // 👈 change to the package you want

function run(cmd) {
  console.log(`\n👉 Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  // 1. Uninstall package
  run(`npm uninstall ${packageName}`);

  // 2. Git add + commit + push
  run("git add .");
  run(`git commit -m "${commitMessage}"`);
  run("git push origin main"); // 👈 change branch if not "main"

  // 3. Reinstall package
  run(`npm install ${packageName}`);
  
  console.log("\n✅ Done!");
} catch (err) {
  console.error("\n❌ Error occurred:", err.message);
  process.exit(1);
}
