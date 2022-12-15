const readline = require('readline');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const Party = require('./src/Party');
const Player = require('./src/Player');

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
    rl.question(`${question} `, (answer) => resolve(answer));
  });
}

(async () => {
  const nbJoueurs = process.argv[2]
    ? Number(process.argv[2])
    : Number(await ask('Combien de joueur voulez-vous (2 ou 4) ?'));

  if (![2, 4].includes(nbJoueurs)) {
    console.log(`"${nbJoueurs}" n'est pas un nombre valide, veuillez saisir 2 ou 4.`);
    process.exit(1);
  }

  const gridSize = process.argv[3]
    ? Number(process.argv[3])
    : Number(await ask('Quelle taille de damier voulez-vous (entre 9 et 15) ?'));
  if (isNaN(gridSize) || gridSize < 9 || gridSize > 15) {
    console.log(`"${gridSize}" n'est pas un nombre valide, veuillez saisir un nombre entre 9 et 15.`);
    process.exit(1);
  }

  const party = new Party(io, { nbJoueurs, gridSize });

  io.on('connection', (socket) => {
    socket.once('auth:session', (session) => {
      if (!session || session.length !== 32) {
        return;
      }

      console.log('Session:', session);
      if (party.players[session]) {
        party.players[session].socket = socket;
        party.players[session].connected = true;
        return;
      }

      party.players[session] = new Player(socket, party);
    });

    console.log('Players:', party.players);
  });

  const PORT = process.env.PORT || 8888;
  server.listen(PORT, () => { console.log(`Listening on http://0.0.0.0:${PORT}`); });
})();
