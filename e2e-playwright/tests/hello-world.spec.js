const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Shared shopping lists");
  await expect(page.locator("h2")).toHaveText("Statistics");
});

test("Can add a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  const listName = `Test list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").nth(0).click();
  await expect(page.locator(`a >> text='${listName}'`)).toHaveText(listName);
});

test("Can open a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  const firstList = await page.locator("a").nth(0);
  await firstList.click();
  await expect(page.locator("h2")).toHaveText(["Add a new item to list", "Items in this shopping lists"]);
});

test("Can add an item.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("a").nth(0).click();
  const itemName = `Test item: ${Math.random()}`;
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit]").nth(0).click();
  await expect(page.locator(`ul > li >> text='${itemName}'`)).toHaveText(itemName);
});

test("Can collect an item.", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("a").nth(0).click();
  const itemName = await page.locator("ul > li").nth(0).textContent();
  await page.locator("ul > form > input[type=submit]").nth(0).click();
  await expect(page.locator(`ul > li > del >> text='${itemName}'`)).toHaveText(itemName);
});