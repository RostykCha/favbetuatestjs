FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app
COPY . .

RUN npm ci          \
 && npx playwright install --with-deps \
 && chmod +x node_modules/.bin/playwright   # (paranoid mode)

CMD ["npx", "--no-install", "playwright", "test", "--config=playwright.config.ts"]
