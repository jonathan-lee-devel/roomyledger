import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('has title', async ({page}) => {
  await expect(page).toHaveTitle(/RoomyLedger/);
});

test('login button redirects to login', async ({page}) => {
  await page.getByTestId('have-an-account-sign-in').click();

  await expect(page).toHaveURL(/login/);
});
