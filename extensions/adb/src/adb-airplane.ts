import { showHUD } from "@raycast/api";
import { execSync } from "child_process";
import checkAdbExists from "./utils";

export default async function airplane() {
  const adbDir = await checkAdbExists();
  const enabled = execSync(`${adbDir} shell settings get global airplane_mode_on`).toString().trim() === "true";
  if (enabled) {
    await showHUD("✈️ Turning off airplane mode");
  } else {
    await showHUD("✈️ Turning on airplane mode");
  }
  execSync(`${adbDir} shell cmd connectivity airplane-mode ${!enabled}`);
}
