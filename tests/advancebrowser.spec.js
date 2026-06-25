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
  await expect(newTab.locator('#live-data')).toHaveText('System Status: Operational1');

  await newTab.close();
  await page.bringToFront();

  page.on('dialog', async(dialog)=>{
    console.log(`Encountered dialog modal of type: ${dialog.type()}`);
    expect(dialog.message()).toContain('administrator security code');

    await dialog.accept('SECURE-AUTH-2026');
  })

  await page.locator("#prompt-btn").click();

  await expect(page.locator("#prompt-result")).toHaveText("Authorized Code: SECURE-AUTH-2026")

  

  const billingFrame = page.frameLocator("#payment-frame");
  const creditCardInput = billingFrame.locator("#card-number");
  const payButton = billingFrame.locator("#pay-btn");
  await creditCardInput.fill('4111 3222 5444 6555');
  await payButton.click();
  await expect(payButton).toHaveText('Processing...');


  
  const customComponentText = page.locator('#shadow-text');
  const customComponentInput = page.locator('#shadow-input');

  await expect(customComponentText).toHaveText('Hidden text inside custom Shadow Root component');
  await customComponentInput.fill('Passing shadow border boundaries');
  await expect(customComponentInput).toHaveValue('Passing shadow border boundaries');

});
