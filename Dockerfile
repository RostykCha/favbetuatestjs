FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --prefer-offline

COPY . .

ENV CI=true

CMD ["npx", "playwright", "test", "--config=playwright.config.ts"]
