const Party = require('./Party');
const util = require('./util');

module.exports = class Player {
  id = util.randomStr(16);
  session = util.randomStr(32);
  connected = false;
  queue = [];

  /**
   * @param {import('socket.io').Socket} socket
   * @param {Party} party
   */
  constructor(socket, party) {
    this.socket = socket;
    this.party = party;
  }

  send(event, ...data) {
    // Si le joueur n'est pas connecté,
    // on ajoute le message à la queue
    if (!this.connected) {
      this.queue.push({ event, data });
      return;
    }
    // Sinon, on envoie les messages de la queue
    for (const { event, data } of this.queue) {
      this.socket.emit(event, ...data);
    }
    this.queue = [];
    // Puis on envoie le message demandé
    return this.socket.emit(event, ...data);
  }
}
