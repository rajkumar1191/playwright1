import { test, expect } from "@playwright/test";
import path from "path";

test("complete idea on auto-retrying assertions", async ({ page }) => {
  const filePath = path.resolve(__dirname, "./assertionandautowait.html");
  await page.goto(`file://${filePath}`);

  const statusSpan = page.locator("#status-text");

  await page.getByRole("button", { name: "Trigger Status Change" }).click();

  await expect(statusSpan).toHaveText("Data Sync Complete");

  const alertBanner = page.locator("#success-alert");

  await expect(alertBanner).not.toBeVisible();

  await page.getByRole("button", { name: "Show Success Notification" }).click();

  await expect(alertBanner).toBeVisible();

  await expect(alertBanner).toContainText("fully completed");

  const checkoutBtn = page.locator("#checkout-btn");

  await expect(checkoutBtn).toBeEnabled();

  await checkoutBtn.click();

  await expect(checkoutBtn).toBeDisabled();
  await expect(checkoutBtn).toHaveAttribute("id", "checkout-btn");

  const currentUrl = page.url();
  expect(currentUrl).toContain('assertionandautowait.html');

  const itemscount = 0;
  expect(itemscount).toBe(0);
});
