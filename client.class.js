class Client {
  constructor (nick, socket) {
    var self = this;

    this.auth = false;

    this.history = [];
    this.nick = nick;
    this.socket = socket;

    this.socket.on('data', data => self.log(data));
  }

  log (data) {
    this.history.push(data.toString());
    console.log(this.history);
  }
}

module.exports = Client;