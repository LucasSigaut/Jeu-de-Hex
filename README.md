# Jeu de Hex

Ce projet est un jeu de Hex développé en JavaScript. Il est basé sur le jeu de plateau Hex, qui est un jeu de stratégie pour deux joueurs. Le but du jeu est de relier les deux côtés opposés du plateau de jeu. Le jeu est joué sur un plateau hexagonal, composé de cases hexagonales. Chaque joueur possède une couleur, et doit relier les deux côtés opposés du plateau de jeu avec ses pions. Le joueur qui réussit à relier les deux côtés du plateau de jeu avec ses pions gagne la partie.

## Installation

1. Cloner le projet
2. Installer les dépendances avec `npm install`
3. Lancer le serveur avec `npm start`
4. Ouvrir le navigateur à l'adresse `http://localhost:8888`

## Fonctionnalités

- Choisir le nombre de joueurs (2 ou 4)
- Choisir la taille du plateau
- Choisir son pseudo
- Reconnexion automatique en cas de rechargement de la page
- Affichage de la liste des joueurs connectés
- Mode spectateur
- Chat

## Dépendances

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [D3.js](https://d3js.org/)

## Développement

Pour lancer le serveur de développement, exécuter la commande `npm run dev`.
Le serveur sera lancé sur le port 8888, et sera rechargé à chaque modification de fichier.

Pour faire en sorte que le script ne redemande pas le nombre de joueur et la taille du plateau à chaque démarrage, vous pouvez exécuter la commande `npm run dev 2 10` pour lancer directement le serveur pour `2` joueurs et un plateau de `10x10`.

## Auteurs

- [Lucas Sigaut](https://github.com/LucasSigaut)
- [Mathieu Colmon](https://github.com/Mathieu2301)
