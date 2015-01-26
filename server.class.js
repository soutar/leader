var net = require('net');

var Client = require('./client.class');

class Leader {
  constructor (options) {
    this.options = options;
    this.clients = [];
    this.packEnd = '\r\n';
    this.start();
  }

  start () {
    this.server = net.createServer(this.onConnect.bind(this));
    this.server.listen(this.options.port, this.listen.bind(this));
  }

  onConnect (socket) {
    var self = this,
        client;

    client = new Client('', socket);

    self.addClient(client);

    socket.on('data', data => self.receive(data, client));
    socket.on('end', () => self.removeClient(client));
  }

  addClient (client) {
    this.clients.push(client);
  }

  removeClient (client) {
    var index = this.clients.indexOf(client);

    if (index === -1) return false;
    
    this.clients.splice(index, 1);
  }

  listen () {
    console.log('Listening on', this.options.port);
  }

  receive (data, client) {
    this.broadcast('Server received' + data);
  }

  /**
   * Send data to all clients
   */
  broadcast (data) {
    var self = this;
    this.clients.forEach(client => self.sendTo(client, data));
  }

  sendTo (client, data) {
    if (client.hasOwnProperty('socket'))
      client.socket.write(data + this.packEnd);
  }

}

module.exports = Leader;