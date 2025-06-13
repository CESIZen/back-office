#!/bin/sh

echo "Lancement de l'entrypoint du conteneur Vite"

npm install

exec "$@"