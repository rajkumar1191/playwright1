import { test, expect } from "@playwright/test";
import path from "path";

test("Element Interaction with Input", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./element-interaction.html");
  await page.goto(`file://${filePath}`);

  const usernameInput = page.getByPlaceholder("Choose a unique name");

  await usernameInput.fill("Playwrightuser");

  await usernameInput.press("Control+A");

  await usernameInput.press("Backspace");

  await usernameInput.pressSequentially("Raj12345", { delay: 50 });

  await expect(usernameInput).toHaveValue("Raj12345");
});

test("Element Interaction with Radio and Checkbox", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./element-interaction.html");
  await page.goto(`file://${filePath}`);

  const proRadio = page.getByLabel("Pro Plan");

  await proRadio.check();

  await expect(proRadio).toBeChecked();

  const newsLetter = page.getByLabel("Subscribe to newsletter update");

  await newsLetter.check();

  await expect(newsLetter).toBeChecked();

  await newsLetter.uncheck();

  await expect(newsLetter).not.toBeChecked();
});

test("Element Interaction with select option", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./element-interaction.html");
  await page.goto(`file://${filePath}`);

  const dropdown = page.locator("#country-dropdown");

  // await dropdown.selectOption('IN');

  // await expect(dropdown).toHaveValue('IN');

  await dropdown.selectOption({ label: "United States" });

  await expect(dropdown).toHaveValue("US");
});

test("Element Interaction with mouse over", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./element-interaction.html");
  await page.goto(`file://${filePath}`);

  const mouseover = page.locator("#menu-hover-btn");

  await mouseover.hover();

  const hiddenLink = page.locator("#content-edit");
  await expect(hiddenLink).toBeVisible();
});

test("Element Interaction with drag over", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./element-interaction.html");
  await page.goto(`file://${filePath}`);

  const source = page.locator("#source-box");
  const targetZone = page.locator("#target-box");

  await source.dragTo(targetZone);

  // await source.hover();
  // await page.mouse.down();
  // await targetZone.hover();
  // await page.mouse.up();

  await expect(targetZone).toHaveText('Item dropped Successfully');
});
