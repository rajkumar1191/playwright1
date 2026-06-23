import { test, expect } from "@playwright/test";
import { request } from "http";
import path from "path";

test.describe("Network API Mocking", () => {
  const filePath = path.resolve(__dirname, "./network.html");

  test("Mock API Network", async ({ page }) => {
    await page.goto(`file://${filePath}`);

    await page.route("**/users", async (route) => {
      const mockPayload = [
        {
          id: 1,
          name: "Leanne Graham - 1",
          username: "Bret",
          email: "Sincere@april.biz",
        },
        {
          id: 2,
          name: "Ervin Howell - 2",
          username: "Antonette",
          email: "Shanna@melissa.tv",
        },
      ];

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockPayload),
      });
    });

    await page.locator("#load-user-btn").click();

    await expect(page.locator(".user-card").first()).toContainText(
      "Leanne Graham - 1",
    );
    await expect(page.locator(".user-card").nth(1)).toContainText(
      "Ervin Howell - 2",
    );
  });

  test("Modify API Request", async ({ page }) => {
    await page.goto(`file://${filePath}`);

    await page.route("**/users", async (route) => {
      const currentHeaders = route.request().headers();

      await route.continue({
        headers: {
          ...currentHeaders,
          authorization: "Bearer token inserted",
          "x-custom-test-suite": "Modify API Request",
        },
      });
    });

    const [requestEvent] = await Promise.all([
      page.waitForResponse("**/users"),
      page.locator("#load-user-btn").click(),
    ]);

    const requestSent = requestEvent.request();
    const headersSent = requestSent.headers();

    expect(headersSent["authorization"]).toBe("Bearer token inserted");
  });

  test("Direct API Request", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/users",
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data[0].id).toBe(1);
  });
});
