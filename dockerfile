FROM mcr.microsoft.com/playwright:v1.63.0-jammy
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3030
CMD [ "npx", "playwright", "test" ]