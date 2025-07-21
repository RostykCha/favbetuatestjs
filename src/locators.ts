// src/locators.ts  ‑‑> ONE canonical map
export const LOC = {
  url: 'https://www.favbet.ua/en',

  /* ────────────── Home page ────────────── */
  home: {
    liveMenu: "//span[normalize-space()='Live']"
  },

  /* ────────────── Home / Login / Register ────────────── */
  login: {
    email:   '#email',
    pass:    '#password',
    submit:  "//button[@type='submit']",
    logoutMarker: 'button[data-testid="logout"]'
  },
  register: {
    email:   "//input[@data-role='register-email-input']",
    pass:    "//input[@data-role='register-password-input']",
    submit:  "//button[@data-role='register-submit-button']"
  },

  /* ────────────── Live page ────────────── */
  live: {
    rows: "div[data-role^='event-body-']",
    favStar: "[data-role='event-favorite-star']",
    favStarIcon: "[data-role='event-favorite-star-icon']",
    cardTitle: "[data-role^='event-participants-name-'] span",
    menuLive: "//span[normalize-space()='Live']",
    tableBody: "//div[@class='BuJhQ QBFqm']"
  },

  /* ────────────── Menu links ────────────── */
  menu: {
    favourites: "//*[@data-role='sports-favorites-link' or @data-role='slideItem_favorite']",
    settings: "//a[@data-role='user-menu-item-settings-toggle']"
  },

  /* ────────────── Favourites table ────────────── */
  favourites: {
    toggle: "[data-role='event-favorite-star']",
    cardTitle: "[data-role^='event-participants-name-'] span",
    tableRows: "div[data-role^='event-body-']",
    /** css builder for the delete icon in a given row */
    removeBtn: (name: string) =>
      `div[data-role^="event-body-"]:has-text("${name}") button[data-role="event-favorite-star"]`
  },

  /* ────────────── Settings page ────────────── */
  settings: {
    langDropdown: "//div[@data-role='settings-language-select-trigger']",
    langEn: "//div[@data-role='option-en']",
    langUa: "//div[@data-role='option-uk']",
    themeDark: "//div[@data-role='settings-color-scheme-switcher-dark']",
    themeLight: "//div[@data-role='settings-color-scheme-switcher-light']",
    bodyDarkClass: "body.dark",
    bodyLightClass: "body.light",
    themeJs: `
      if (document.body.classList.contains('dark'))  return 'dark';
      if (document.body.classList.contains('light')) return 'light';
      return document.documentElement.getAttribute('data-theme') || 
             document.body.getAttribute('data-theme');
    `
  },

  /* ────────────── YouTube embedded workflow ────────────── */
  youtube: {
    acceptCookiesBtn: "//button[@aria-label='Accept all' or .//span[normalize-space()='Accept all']]",
    channelName: "//span[@role='text' and text()='Favbet UA']",
    searchField: "//input[@id='search' or @name='search_query' or @name='query']",
    videoTitles: "//ytd-video-renderer//a[@id='video-title']",
    icon: "//a[contains(@href,'https://www.youtube.com/@favbetua')]"
  },

  /* ────────────── Auth links ────────────── */
  auth: {
    loginLink: "//a[@data-role='header-login-button']",
    registerLink: "//a[@data-role='header-register-button']"
  },

  /* ────────────── Miscellaneous ────────────── */
  profile: {
    icon: "[data-role='user-logo-header']"
  },
  notification: {
    close: "[data-role='icon-notification-close']"
  }
} as const;
