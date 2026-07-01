import { chromium } from "@playwright/test";
import path from "path";

async function globalSetup(config) {
  const baseURL = process.env.ENV_URL || "https://playwright.dev/";

  const browser = await chromium.launch();
  const page = await browser.newPage();

//   await page.goto(`${baseURL}/login`);
//   await page.getByPlaceholder("Username").fill("admin");
//   await page.getByPlaceholder("Password").fill("Admin@123");
//   await page.getByRole("button", { name: "Sign In" }).click();

//   await page.waitForURL(`${baseURL}/dashboard`);

  const storagePath = path.resolve(__dirname, "./../storageState.json");

  await page.context().storageState({ path: storagePath });
}

export default globalSetup;

// Custom fixture