import { test, expect } from "@playwright/test";
import path from "path";

import { Home } from "../pages/Home";

const filePath = path.resolve(__dirname, "./home.html");

test("Verify Dashboard using POM", async ({ page }) => {
  const dashboard = new Home(page);

  await dashboard.navigateTo(filePath);

  await expect(dashboard.welcomeHeader).toHaveText("Welcome Back, Admin");
  await expect(dashboard.profileCard).toBeVisible();

  await dashboard.executeLogout();

  await expect(dashboard.statusAlert).toBeVisible();
  await expect(dashboard.welcomeHeader).toHaveText("Goodbye!");
});
