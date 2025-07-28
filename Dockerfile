FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app
COPY package*.json ./

RUN npm ci \
 && npx playwright install --with-deps   # optional on MS base image, but harmless

COPY . .

CMD ["npx", "playwright", "test", "--config", "playwright.config.ts"]