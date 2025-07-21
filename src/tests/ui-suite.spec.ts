// src/tests/ui-suite.spec.ts
import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import LivePage from '../pages/LivePage';

const user = { email: 'asdasdasd@asdsd.mail.com', pass: 'UQjB5eVyHHeavj' };

test('T001 – favourites mirror live view', async ({ page }) => {
  console.log('Test T001 started.');

  console.log('Opening home page...');
  const home = await new HomePage(page).open();
  console.log('Navigating to login page...');
  const loginPage = await home.navigateToLoginPage();
  console.log('Logging in...');
  const profile = await loginPage.loginUser(user);

  console.log('Navigating to live page...');
  const live = await profile.navigateToLivePage();
  console.log('Selecting all available favourites...');
  const selected = await live.selectAllAvailableFavorites();
  console.log('Navigating to favourites page...');
  const favPage = await live.navigateToFavoritesPage();
  console.log('Getting all favourites from table...');
  const table = await favPage.getAllFavorites();
  expect(table.sort()).toEqual(selected.sort());
  
  const removed = selected[0];
  console.log(`Removing favourite: ${removed}`);
  await favPage.removeFavoriteByName(removed);
  console.log('Refreshing and waiting for table body...');
  await favPage.refreshWaitForTableBody();
  console.log('Getting all favourites after removal...');
  const after = await favPage.getAllFavorites();
  expect(after).not.toContain(removed);
  expect(after.length).toBe(selected.length - 1);

  console.log('Test T001 completed.');
});
