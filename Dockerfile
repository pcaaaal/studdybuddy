FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Nur package.json kopieren für besseres Caching
COPY ./package*.json ./

# Dependencies installieren
RUN npm install

# Rest der App kopieren
COPY ./ .

# Port freigeben
EXPOSE 3000

# Entwicklungsserver starten (zur Laufzeit, nicht beim Build)
CMD ["npm", "run", "dev"]
