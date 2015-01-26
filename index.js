/**
 * Leader
 *
 * Crew chat server prototype
 */

var Leader = require('./server.class');

var Server = new Leader({
  port: 5647,
  clientLimit: 16,
});