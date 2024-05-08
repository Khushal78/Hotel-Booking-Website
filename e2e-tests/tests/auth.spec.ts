import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in ", async ({ page }) => {
  await page.goto(UI_URL);
   
//get the sign in button
  await page.getByRole("link",{name:"Sign in"}).click(); 
  
  await expect(page.getByRole("heading",{name:"Sign in"})).toBeVisible();

  await page.locator("[name='email']").fill("k@k.com");
  await page.locator("[name='password']").fill("kkkkkk");

  await page.getByRole("button", {name:"Login"}).click();

  await expect(page.getByText("Sign in Successfull!")).toBeVisible();
  await expect(page.getByRole("link",{name:"MyBookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"MyHotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign-Out"})).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000)+10000}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link",{name:"Sign In"}).click();
  await page.getByRole("link",{name:"Create an account here"}).click();
  await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible();

  await page.locator("[name='firstName']").fill("tes_firstName");
  await page.locator("[name='lastName']").fill("tes_lastName");
  await page.locator("[name='email']").fill(testEmail); 
  await page.locator("[name='password']").fill("pssword123");
  await page.locator("[name='confirmPassword']").fill("pssword123");

  await page.getByRole("button",{name:"Create Account"}).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link",{name:"MyBookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"MyHotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign-Out"})).toBeVisible();
});