# Dockerfile für Next.js
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Dependencies installieren
COPY ./ ./
RUN npm install

# App builden
RUN npm run dev

# Startbefehl
CMD ["npm", "run", "start"]
