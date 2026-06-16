import {test, expect} from '@playwright/test';
import path from 'path';

test('selector by css', async ({page}) => {
    const filePath = path.resolve(__dirname, './cssandxpath.html');
    await page.goto(`file://${filePath}`);

    const firstItem = await page.locator('div.container > ul > li:first-child');
    await expect(firstItem).toHaveText('Home');
});

test('selector by xpath', async ({page}) => {
    const filePath = path.resolve(__dirname, './cssandxpath.html');
    await page.goto(`file://${filePath}`);
    const firstItem = await page.locator('//div[@class="container"]//ul/li[1]');
    await expect(firstItem).toHaveText('Home');
});

test('selector by xpath for alert banner', async ({page}) => {
    const filePath = path.resolve(__dirname, './cssandxpath.html');
    await page.goto(`file://${filePath}`);

    const alertBanner = await page.locator('//h1[contains(text(), "Welcome")]');
    await alertBanner.waitFor();
    await expect(alertBanner).toContainText('Please pay attention!');
});