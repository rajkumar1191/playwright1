import { test, expect } from "@playwright/test";
import path from "path";

test("complete idea on advanced browser interactions", async ({ context, page }) => {
  const filePath = path.resolve(__dirname, "./advancebrowser.html");
  await page.goto(`file://${filePath}`);

  const [newTab] = await Promise.all([
    context.waitForEvent('page'), 
    page.locator('#new-tab-btn').click()
  ]);

  await newTab.waitForLoadState();

  // expect(newTab.url()).toBe('about:blank');
  await expect(newTab.locator('#live-data')).toHaveText('System Status: Operational');

  await newTab.close();
  await page.bringToFront();


  

});
