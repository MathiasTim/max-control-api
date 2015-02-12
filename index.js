'use strict';
var MaxCube = require('max-control');
var myMaxCube = new MaxCube('192.168.2.111', 62910);

myMaxCube.on('update', function (devices) {
  console.log(devices);
});

myMaxCube.on('error', function (error) {
  console.log(error);
});

var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('<a href="/rooms">Rooms</a><br><a href="/devices">Devices</a><br><a href="/status">Status</a><br>');
  }
});

server.route({
  method: 'GET',
  path: '/rooms',
  handler: function (request, reply) {
    reply({count: myMaxCube.rooms.length, items: myMaxCube.rooms});
  }
});

server.route({
  method: 'GET',
  path: '/devices',
  handler: function (request, reply) {
    reply({count: myMaxCube.deviceCount, items: myMaxCube.devices});
  }
});

server.route({
  method: 'GET',
  path: '/status',
  handler: function (request, reply) {
    reply({
      connected: myMaxCube.isConnected,
      busy: myMaxCube.busy,
      dutyCycle: myMaxCube.dutyCycle,
      memorySlots: myMaxCube.memorySlots,
      ip: myMaxCube.ip,
      port: myMaxCube.port,
      interval: myMaxCube.interval
    });
  }
});
