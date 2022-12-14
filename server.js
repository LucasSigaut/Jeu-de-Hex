const listJoueurs = [];
let nbJoueurs;

app.get('/', (request, response) => {
  response.sendFile('clientHex1_0.html', {root: __dirname});
});

io.on('connection', (socket) => {
  // socket.id 
  socket.on('test', () => {
    console.log("Message reçu d'un client");
    socket.emit('test', {'quiterepond': 'le serveur !'});
  });

  socket.on('nvJoueur', (data) => {
    if (!(listJoueurs.includes(data)) && listJoueurs.length < nbJoueurs){
      listJoueurs.push(data);
      socket.emit('nvJoueur', listJoueurs.indexOf(data));
      io.emit('listJoueur', listJoueurs);
    }
  });

  socket.on('quitter', (data) => {
    if (listJoueurs.includes(data)){
      listJoueurs.splice(listJoueurs.indexOf(data),1);
      io.emit('listJoueur', listJoueurs);
    }
  });

  socket.on('afficheJoueur', () => {
    socket.emit('listJoueur', listJoueurs);
  });
});

server.listen(8888, () => { console.log('Le serveur écoute sur le port 8888'); });
