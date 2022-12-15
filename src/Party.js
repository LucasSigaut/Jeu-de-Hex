const Player = require('./Player');
const Grid = require('./Grid.js');

/**
 * @typedef {Object} PartyConfig
 * @prop {number} nbJoueurs
 * @prop {number} gridSize
 */

module.exports = class Party {
  /** @type {Object<string, Player>} */
  players = {};

  /**
   * @param {import('socket.io').Server} socket
   * @param {PartyConfig} party
   */
  constructor(socket, { nbJoueurs, gridSize }) {
    this.socket = socket;
    this.nbJoueurs = nbJoueurs;
    this.grid = new Grid(gridSize);
  }
};
