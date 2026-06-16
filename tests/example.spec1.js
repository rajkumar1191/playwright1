// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

<button title="Close">x</button>
/*
Locators are the primary way to find elements in Playwright. They are used in all interactions with the page, such as clicking, filling forms, and asserting conditions.

  1. page.getByRole() - to locate elements by their ARIA role, such as buttons, links, headings, etc.
      eg: await page.getByRole('button', { name: 'Submit' }).click();
  2. page.getByText() - to locate elements by their text content.
      eg: await page.getByText('Welcome to Playwright').toBeVisible();
  3. page.getByLabel() - to locate form controls by their associated labels.
      eg: await page.getByLabel('Username').fill('john');
  4. page.getByPlaceholder() - to locate input fields by their placeholder text.
      eg: await page.getByPlaceholder('Enter your email').fill('john@example.com');
  5. page.getByAltText() - to locate images by their alt text.
      eg: await page.getByAltText('Playwright logo').toBeVisible();
  6. page.getByTitle() - to locate elements by their title attribute.
      eg: await page.getByTitle('Close').click();
      eg: await expect(page.getByTitle('Close')).toHaveText('x');
  7. page.getByTestId() - to locate elements by a custom data-testid attribute, which is often used in testing for easier element selection.
      eg: await expect(page.getByTestId('custom-element')).toBeVisible();

  Actions are performed on locators, such as clicking, filling, or asserting conditions. For example:
  1. fill() - to enter text into input fields.
      eg: await page.getByLabel('Username').fill('john');
  2. click() - to click on buttons, links, or other clickable elements.
      eg: await page.getByRole('button', { name: 'Submit' }).click();
  3. toBeVisible() - to assert that an element is visible on the page.
      eg: await expect(page.getByText('Welcome to Playwright')).toBeVisible();
  4. toHaveText() - to assert that an element has specific text content.
      eg: await expect(page.getByTitle('Close')).toHaveText('x');
  5. toHaveAttribute() - to assert that an element has a specific attribute with a certain value.
      eg: await expect(page.getByTitle('Close')).toHaveAttribute('title', 'Close');
  6. check() - to check a checkbox or radio button.
      eg: await page.getByLabel('Accept Terms').check();
      eg: await expect(page.getByLabel('Accept Terms')).toBeChecked();
  7. uncheck() - to uncheck a checkbox or radio button.
      eg: await page.getByLabel('Accept Terms').uncheck();
      eg: await expect(page.getByLabel('Accept Terms')).not.toBeChecked();
  8. selectOption() - to select an option from a dropdown menu.
      eg: await page.getByLabel('Country').selectOption('USA');
      eg: await expect(page.getByLabel('Country')).toHaveValue('USA');
  9. dblclick() - to double-click on an element.
      eg: await page.getByRole('button', { name: 'Submit' }).dblclick();
  10. hover() - to hover over an element.
      eg: await page.getByRole('button', { name: 'Submit' }).hover();
  11. press() - to simulate a key press on an element. like - Backquote, Enter, Tab, etc.
      eg: await page.getByLabel('Username').press('Enter');
  12. scrollIntoViewIfNeeded() - to scroll an element into view if it is not already visible.
      eg: await page.getByText('Load More').scrollIntoViewIfNeeded();
  13. focus() - to set focus on an element.
      eg: await page.getByLabel('Username').focus();
  14. blur() - to remove focus from an element.
      eg: await page.getByLabel('Username').blur();
  15. isVisible() - to check if an element is visible on the page.
      eg: const isVisible = await page.getByText('Welcome to Playwright').isVisible();
  16. isEnabled() - to check if an element is enabled and can be interacted with.
      eg: const isEnabled = await page.getByRole('button', { name: 'Submit' }).isEnabled();
  17. isChecked() - to check if a checkbox or radio button is checked.
      eg: const isChecked = await page.getByLabel('Accept Terms').isChecked();
  18. count() - to get the number of elements matching a locator.
      eg: const buttonCount = await page.getByRole('button').count();
  19. nth() - to select a specific element from a list of matching elements.
      eg: await page.getByRole('button').nth(0).click(); // Clicks the first button
  20. first() - to select the first element from a list of matching elements.
      eg: await page.getByRole('button').first().click();
  21. last() - to select the last element from a list of matching elements.
      eg: await page.getByRole('button').last().click();
  22. all() - to select all elements matching a locator.
      eg: const allButtons = await page.getByRole('button').all();
  23. filter() - to filter elements based on a condition.
      eg: const visibleButtons = await page.getByRole('button').filter({ has: page.getByText('Visible') });
  24. withText() - to filter elements that contain specific text.
      eg: const submitButtons = await page.getByRole('button').withText('Submit');
  25. withAttribute() - to filter elements that have a specific attribute value.
      eg: const closeButtons = await page.getByRole('button').withAttribute('title', 'Close');
  26. withClass() - to filter elements that have a specific class name.
      eg: const primaryButtons = await page.getByRole('button').withClass('primary');
  27. withId() - to filter elements that have a specific id.
      eg: const submitButton = await page.getByRole('button').withId('submit-btn');
  28. withRole() - to filter elements that have a specific ARIA role.
      eg: const linkButtons = await page.getByRole('button').withRole('link');
  29. withTitle() - to filter elements that have a specific title attribute value.
      eg: const closeButtons = await page.getByRole('button').withTitle('Close');
  30. withPlaceholder() - to filter elements that have a specific placeholder text.
      eg: const emailInputs = await page.getByRole('textbox').withPlaceholder('Enter your email');
  31. withLabel() - to filter elements that have a specific associated label.
      eg: const usernameInputs = await page.getByRole('textbox').withLabel('Username');
  32. withAltText() - to filter elements that have a specific alt text.
      eg: const logoImages = await page.getByRole('img').withAltText('Playwright logo');
  33. withTestId() - to filter elements that have a specific data-testid attribute value.
      eg: const customElements = await page.getByRole('button').withTestId('custom-element');
  34. withTextContent() - to filter elements that contain specific text content.
      eg: const welcomeMessages = await page.getByRole('heading').withTextContent('Welcome');
  35. withExactText() - to filter elements that have an exact text match.
      eg: const submitButtons = await page.getByRole('button').withExactText('Submit');
  36. withExactRole() - to filter elements that have an exact ARIA role match.
      eg: const submitButtons = await page.getByRole('button').withExactRole('submit');
  37. withExactLabel() - to filter elements that have an exact associated label match.
      eg: const usernameInputs = await page.getByRole('textbox').withExactLabel('Username');
  38. withExactPlaceholder() - to filter elements that have an exact placeholder text match.
      eg: const emailInputs = await page.getByRole('textbox').withExactPlaceholder('Enter your email');
  39. withExactAltText() - to filter elements that have an exact alt text match.
      eg: const logoImages = await page.getByRole('img').withExactAltText('Playwright logo');
  40. withExactTitle() - to filter elements that have an exact title attribute value match.
      eg: const closeButtons = await page.getByRole('button').withExactTitle('Close');
  41. withExactTestId() - to filter elements that have an exact data-testid attribute value match.
      eg: const customElements = await page.getByRole('button').withExactTestId('custom-element');
  42. withExactTextContent() - to filter elements that have an exact text content match.
      eg: const welcomeMessages = await page.getByRole('heading').withExactTextContent('Welcome to Playwright');
  43. withExactClass() - to filter elements that have an exact class name match.
      eg: const primaryButtons = await page.getByRole('button').withExactClass('primary');
  44. withExactId() - to filter elements that have an exact id match.
      eg: const submitButton = await page.getByRole('button').withExactId('submit-btn');
  45. withExactRole() - to filter elements that have an exact ARIA role match.
      eg: const submitButtons = await page.getByRole('button').withExactRole('submit');
  46. withExactTitle() - to filter elements that have an exact title attribute value match.
      eg: const closeButtons = await page.getByRole('button').withExactTitle('Close');
  47. withExactPlaceholder() - to filter elements that have an exact placeholder text match.
      eg: const emailInputs = await page.getByRole('textbox').withExactPlaceholder('Enter your email');
  48. withExactLabel() - to filter elements that have an exact associated label match.
      eg: const usernameInputs = await page.getByRole('textbox').withExactLabel('Username');
  49. withExactAltText() - to filter elements that have an exact alt text match.
      eg: const logoImages = await page.getByRole('img').withExactAltText('Playwright logo');
  50. withExactTestId() - to filter elements that have an exact data-testid attribute value match.
      eg: const customElements = await page.getByRole('button').withExactTestId('custom-element');
  51. withExactTextContent() - to filter elements that have an exact text content match.
      eg: const welcomeMessages = await page.getByRole('heading').withExactTextContent('Welcome to Playwright');
  52. setInputFiles() - to set files for an input element of type file.
      eg: await page.getByLabel('Upload').setInputFiles('path/to/file.txt');
  53. clear() - to clear the value of an input field.
      eg: await page.getByLabel('Username').clear();
  54. type() - to type text into an input field with optional delay between keystrokes.
      eg: await page.getByLabel('Username').type('john', { delay: 100 });
    
*/