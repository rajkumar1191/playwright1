import { test as baseTest } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { Home } from '../pages/Home';

export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new Home(page));
  },

  authenticatedHomePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(   );
    await loginPage.executeLogin('admin', 'admin123');

    await use(homePage);
  }
});

export { expect } from '@playwright/test';