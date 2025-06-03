# Dockerfile für Next.js
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Dependencies installieren
COPY nextjs-app/package*.json ./
RUN npm install

# App kopieren
COPY nextjs-app/ .

# App builden
RUN npm run build

# Startbefehl
CMD ["npm", "run", "start"]
