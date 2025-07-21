# analogous to openjdk:17-jdk docker image for Java tests
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
CMD ["npx", "playwright", "test", "--config", "playwright.config.ts"]
