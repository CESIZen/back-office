FROM node:22-alpine3.22 AS builder

LABEL org.opencontainers.image.source=https://github.com/cesizen/back-office

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

# On copie le script d'entrée dans le conteneur et on retire le .sh pour ne pas avoir à le remettre à chaque fois
COPY docker/vite/entrypoint.sh /usr/local/bin/entrypoint
 # On donne les droits d'exécution au script
RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT [ "entrypoint" ]
CMD ["serve", "-s", "dist"]
