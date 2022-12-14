const readline = require('readline');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new SocketIO.Server(server);

app.use(express.static('public'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

(async () => {
  const nbJoueurs = Number(await ask('Combien de joueur voulez-vous (2 ou 4) ? '));
  if (![2, 4].includes(nbJoueurs)) {
    console.log(`"${nbJoueurs}" n'est pas un nombre valide, veuillez saisir 2 ou 4.`);
    process.exit(1);
  }

  const gridSize = Number(await ask('Quelle taille de damier voulez-vous (entre 9 et 15) ? '));
  if (isNaN(gridSize) || gridSize < 9 || gridSize > 15) {
    console.log(`"${gridSize}" n'est pas un nombre valide, veuillez saisir un nombre entre 9 et 15.`);
    process.exit(1);
  }

  // const party = new Party({ nbJoueurs, gridSize });

  // io.on('connection', (socket) => {
  //   const player = new Player({ socket, party });
  //   party.addPlayer(player);
  // });

  server.listen(8888, () => { console.log('Le serveur écoute sur le port 8888'); });
})();
