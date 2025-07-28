// src/tests/ui-suite.spec.ts
import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import LivePage from '../pages/LivePage';


const user = { email: 'asdasdasd@asdsd.mail.com', pass: 'UQjB5eVyHHeavj' };
const videoTitle =
  'FAVBET | Support Those Who Support Us: ENGLAND | 2022 FIFA World Cup';

test('T001 – favourites list size changes after add & remove', async ({ page }) => {
  console.log('==========  T001 started  ==========');

  console.log('Opening home page …');
  const home = await new HomePage(page).open();

  console.log('Navigating to login page …');
  const loginPage = await home.navigateToLoginPage();

  console.log(`Logging in as ${user.email} …`);
  const profile = await loginPage.loginUser(user);
  await profile.closeNotificationIfPresent();
  console.log('Login successful, notifications (if any) closed');

  console.log('Navigating to “Live” page …');
  const live = await profile.navigateToLivePage();

  console.log('Clicking the star on the first live event …');
  await live.selectFirstFavorite();
  console.log('Star clicked');

  console.log('Opening “Favourites” page …');
  const favPage = await live.navigateToFavoritesPage();
  await favPage.refreshWaitForTableBody();
  console.log('Favourites table loaded');

  console.log('Waiting until at least one favourite is present …');
  let listBefore = await favPage.getAllFavorites();
  for (let i = 0; listBefore.length === 0 && i < 10; i++) {
    await page.waitForTimeout(500);
    listBefore = await favPage.getAllFavorites();
  }
  if (listBefore.length === 0) {
    throw new Error('Favourite did not appear in the list within 5 seconds');
  }
  console.log(`Favourites before removal: ${listBefore.length}`);

  console.log('Removing the first favourite …');
  await favPage.removeFirstFavorite();
  console.log('First favourite removed and table refreshed');

  const listAfter = await favPage.getAllFavorites();
  console.log(`Favourites after removal:  ${listAfter.length}`);

  console.log('Verifying the list size decreased by exactly one …');
  expect(listAfter.length).toBe(listBefore.length - 1);
  console.log('Verification passed');

  console.log('==========  T001 completed  ==========');
});

test('T002 – YouTube channel & video', async ({ page }) => {
  console.log('Test T002 started.');

  console.log('Opening home page…');
  const home = await new HomePage(page).open();
  console.log('Opening YouTube channel from footer…');
  const youtubePage = await home.openYoutubeFromFooter();
  console.log('Accepting YouTube cookies');
  await youtubePage.acceptCookies();

  console.log('Verifying channel name…');
  await youtubePage.verifyYoutubeChannelName();
  console.log('Checking video…');
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
  await settings.changeToUkrainianAndVerify();
  console.log('Toggling to dark theme (UA)…');
  await settings.changeToDarkThemeAndVerify();
  console.log('Toggling back to light theme (UA)…');

  await settings.changeToLightThemeAndVerify();
  console.log('Switching language to English…');
  await settings.changeToEnglishAndVerify();
  console.log('Toggling to dark theme (EN)…');
  await settings.changeToDarkThemeAndVerify();
  console.log('Toggling back to light theme (EN)…');
  await settings.changeToLightThemeAndVerify();

  console.log('Test T003 completed.');
});

