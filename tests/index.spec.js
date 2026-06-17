import { test, expect } from "@playwright/test";
import path from "path";

// test("should display the correct title from playwright.dev", async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   const title = await page.title();
//   expect(title).toContain("Playwright");
// });

test("should display the correct title", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./index.html");
  await page.goto(`file://${filePath}`);
  const title = await page.title();
  expect(title).toBe("My App Title");
});

test("should display the welcome message", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./index.html");
  await page.goto(`file://${filePath}`);
  const welcomeMessage = await page.textContent("#welcome");
  expect(welcomeMessage).toBe("Welcome to My App");
});

test("should fill the input", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./index.html");
  await page.goto(`file://${filePath}`);
  const nameInput = await page.getByPlaceholder("Enter the name");
  await nameInput.fill("John Doe");
  const inputValue = await nameInput.inputValue();
  expect(inputValue).toBe("John Doe");
});

test("submit button need to be exist", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./index.html");
  await page.goto(`file://${filePath}`);
  const submitButton = await page.getByRole("button", { name: "Submit" });
  await expect(submitButton).toBeVisible();
});


test("submit button need to be exist by id", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./index.html");
  await page.goto(`file://${filePath}`);
  const submitButton = await page.locator("#greet");
  await expect(submitButton).toBeVisible();
});