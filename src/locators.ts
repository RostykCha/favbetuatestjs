// src/locators.ts ‑‑ canonical selector map
export const LOC = {
  url: 'https://www.favbet.ua/en/',

  home: {
    liveMenu: 'role=link[name="Live"]'
  },

  auth: {
    loginLink: 'role=link[name="Log in"]',
    registerLink: 'role=link[name="Register"]'
  },

  login: {
    email: 'role=textbox[name="Email"]',
    pass: 'role=textbox[name="Password"]',
    submit: 'role=button[name="Log in"]',
    logoutMarker: '[data-testid="logout"]'    // unchanged
  },

  register: {
    email: 'input[data-role="register-email-input"]',
    pass: 'input[data-role="register-password-input"]',
    submit: 'button[data-role="register-submit-button"]'
  },

  live: {
    rows: 'div[data-role^="event-body-"]',
    favStar: '[data-role="event-favorite-star"]',
    favStarIcon: '[data-role="event-favorite-star-icon"]',
    cardTitle: '[data-role^="event-participants-name-"] span',
    tableBody: 'div.BuJhQ.QBFqm'
  },

  menu: {
    favourites: '[data-role="sports-favorites-link"], [data-role="slideItem_favorite"]',
    userAvatar: 'css=[data-role="user-logo-header"]',
    userBalanceZero: 'text=0.00',
    settingsPage: 'role=link[name="Settings"]'
  },

settings: {
  langDropdown:     'div[data-role="settings-language-select-trigger"]',
  langEnOption:     'div[data-role="option-en"]',
  langUaOption:     'div[data-role="option-uk"]',
  themeDarkButton:  'div[data-role="settings-color-scheme-switcher-dark"]',
  themeLightButton: 'div[data-role="settings-color-scheme-switcher-light"]',
  bodyDarkClass:  'body.dark',
  bodyLightClass: 'body.light'
},

  favourites: {
    toggle: '[data-role="event-favorite-star"]',
    cardTitle: '[data-role^="event-participants-name-"] span',
    tableRows: 'div[data-role^="event-body-"]',
    removeBtn: (name: string) =>
      `div[data-role^="event-body-"]:has-text("${name}") button[data-role="event-favorite-star"]`
  },

  footer: {
    youtube: 'role=link[name="Youtube"]'
  },

  youtube: {
    consentFrame: 'iframe[src*="consent"]',
    acceptCookiesBtn:
      'button:has-text("Accept all"), button:has-text("Agree"), ' +
      'button:has-text("Прийняти все"), button:has-text("Принять все")',

    /* search widgets – now exactly what the recorder saw */
    searchInput:
      'role=textbox[name="Search"], input#search, input[name="search_query"]',
    searchToggle: '#icon-button[aria-label="Search"], button#search-icon-legacy',

    resultTitles: 'ytd-video-renderer a#video-title',
    channelName: 'role=heading[name="Favbet UA"]'
  },

  profile: {
    icon: '[data-role="user-logo-header"]'
  },
  notification: {
    close: '[data-role="icon-notification-close"]'
  }
} as const;
