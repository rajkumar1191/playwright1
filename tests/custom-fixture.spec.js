import { test, expect } from "../fixtures/baseTest";
import path from "path";

const filePath = path.resolve(__dirname, "./home.html");
test("Verify Dashboard using POM", async ({ homePage }) => {
  await homePage.navigateTo(filePath);

  await expect(homePage.welcomeHeader).toHaveText("Welcome Back, Admin");
  await expect(homePage.profileCard).toBeVisible();
});
