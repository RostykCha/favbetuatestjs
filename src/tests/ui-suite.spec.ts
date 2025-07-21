// src/tests/ui-suite.spec.ts
import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import LivePage from '../pages/LivePage';

const user = { email: 'asdasdasd@asdsd.mail.com', pass: 'UQjB5eVyHHeavj' };
const videoTitle =
  'FAVBET | Support Those Who Support Us: ENGLAND | 2022 FIFA World Cup';

test('T001 – favourites mirror live view', async ({ page }) => {
  console.log('Test T001 started.');

  console.log('Opening home page...');
  const home = await new HomePage(page).open();
  console.log('Navigating to login page...');
  const loginPage = await home.navigateToLoginPage();
  console.log('Logging in...');
  const profile = await loginPage.loginUser(user);
  await profile.closeNotificationIfPresent();

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


test('T002 – YouTube channel & video', async ({ page }) => {
  console.log('Test T002 started.');

  console.log('Opening home page…');
  const home = await new HomePage(page).open();
  console.log('Navigating to login page…');
  const loginPage = await home.navigateToLoginPage();
  console.log('Logging in…');
  await loginPage.loginUser(user);
    await loginPage.closeNotificationIfPresent();

  console.log('Opening YouTube channel from footer…');
  const youtubePage = await home.openYoutubeFromFooter();
  console.log('Accepting YouTube cookies (if shown)…');
  await youtubePage.acceptCookies();
  
  console.log('Verifying channel name…');
  await youtubePage.verifyYoutubeChannelName();
  console.log('Searching for video…');
  await youtubePage.checkVideoIsPresent(videoTitle);
  
  console.log('Test T002 completed.');
});

test('T003 – language & theme change', async ({ page }) => {
  console.log('Test T003 started.');
  console.log('Opening home page…');
  const home = await new HomePage(page).open();
  console.log('Navigating to login page…');
  const loginPage = await home.navigateToLoginPage();
  console.log('Logging in…');
  const profile = await loginPage.loginUser(user);
  await loginPage.closeNotificationIfPresent();

  console.log('Navigating to settings page…');
  const settings = await profile.navigateToSettingsPage();
  console.log('Switching language to Ukrainian…');
  await settings.cnahgeToUkrainianAndVerify();
  console.log('Toggling to dark theme (UA)…');
  await settings.changeToDarkThemeAndVerify();
  console.log('Toggling back to light theme (UA)…');

  await settings.changeToLightThemeAndVerify();
  console.log('Switching language to English…');
  await settings.cnahgeToEnglishAndVerify();
  console.log('Toggling to dark theme (EN)…');
  await settings.changeToDarkThemeAndVerify();
  console.log('Toggling back to light theme (EN)…');
  await settings.changeToLightThemeAndVerify();

  console.log('Test T003 completed.');
});

