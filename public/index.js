const $ = document.querySelector.bind(document);

const $e = {
  body: document.body,
  loading: {
    page: $('#loadingPage'),
    text: $('#loadingText'),
  },
  login: {
    page: $('#loginPage'),
    form: $('#loginForm'),
  },
  game: {
    header: {
      playerName: $('#playerName'),
      disconnectBtn: $('#disconnectBtn'),
    },
  },
};

function setPage(page) {
  $e.body.className = `page-${page}`;
}

function setLoading(text) {
  const page = $e.body.className;
  $e.loading.text.textContent = text;
  setPage('loading');
  return () => setPage(page);
}

setLoading('Connexion...');

const socket = io();

const PLAYER = {
  id: null,
  username: sessionStorage.getItem('username'),
  session: sessionStorage.getItem('session'),
};

socket.on('connect', () => {
  setLoading('Authentification...');
  socket.emit('auth:session', PLAYER.session);

  socket.on('auth:new', () => {
    setPage('login');
  });

  socket.on('auth:ok', (player) => {
    PLAYER.id = player.id;
    PLAYER.username = player.username;
    PLAYER.session = player.session;
    sessionStorage.setItem('session', player.session);
    setLoading('Chargement de la partie...');
  });

  socket.on('player:joined', (player) => {
    if (player.id === PLAYER.id) {
      $e.game.header.playerName.textContent = player.username;
      $e.game.header.disconnectBtn.addEventListener('click', () => {
        socket.emit('player:leave');
        setPage('login');
      });
      setPage('game');
    }

    
  });

  socket.on('player:', (player) => {

  });

  socket.on('error', (error) => {
    alert(error);
  });
});

$e.login.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = $e.login.form.username.value;
  const password = $e.login.form.password.value;
  socket.emit('auth:new', username, password, cb);
});

// let numJoueur;

// function test() {
//   console.log('J\'appelle le serveur');
//   socket.emit('test', 'Ô serveur, je t\'envoie ce message');
// }

// socket.on('test', data => {
//   console.log('Réponse du serveur');
//   console.dir(data);
// });

// function creerJoueur(){
//   const nom = $('#nomJoueur').val();
//   socket.emit('nvJoueur', nom);
//   socket.on('nvJoueur', (indexJoueur) => {
//     numJoueur = indexJoueur;
//   });
// }

// function quitterJoueur() {
//   const nom = $('#nomJoueur').val();
//   socket.emit('quitter', nom);
// }

// socket.on('listJoueur', (data) => {
//   $('#listJoueurs').empty();
//   for (let i = 0; i < data.length; i += 1) {
//     $('#listJoueurs').append('<li>' + data[i] + '</li>');
//   }
// });

// window.addEventListener('load', () => {
//   socket.emit('afficheJoueur');
//   genereDamier(15, 11, 11);
// });

// function creeHexagone(rayon) {
//   const points = [];
//   for (let i = 0; i < 6; i += 1) {
//     const angle = i * Math.PI / 3;
//     const x = Math.sin(angle) * rayon;
//     const y = -Math.cos(angle) * rayon;
//     points.push([Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
//   }

//   return points;
// }

// function genereDamier(rayon, nbLignes, nbColonnes) {
//   const distance = rayon - (Math.sin(1 * Math.PI / 3) * rayon);
//   d3.select('#tablier')
//     .append('svg')
//     .attr('width', nbLignes * 4 * rayon)
//     .attr('height', nbLignes * 2 * rayon);

//   let hexagone = creeHexagone(rayon);
//   for (let ligne = 0; ligne < nbLignes; ligne += 1) {
//     for (let colonne = 0; colonne < nbColonnes; colonne += 1) {
//       let d = '';
//       let x, y;
//       for (h in hexagone) {
//         x = hexagone[h][0] + (rayon - distance) * (2 + 2 * colonne + ligne);
//         y = distance * 2 + hexagone[h][1] + (rayon - distance * 2) * (1 + 2 * ligne);
//         if (h == 0) d += 'M' + x + ',' + y + ' L';
//         else d += x + ',' + y + ' ';
//       }
//       d += 'Z';
//       d3.select('svg')
//         .append('path')
//         .attr('d', d).attr('stroke', 'black').attr('fill', 'white')
//         .attr('id', 'h' + (ligne * 11 + colonne))
//         .on('click', (d) => { d3.select(this).attr('fill', 'red'); });
//     }
//   }
// }
