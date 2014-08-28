'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Person = function (user, socket) {
    EventEmitter.call(this);

    this.id = user.id;
    this.name = user.name;
    this.image = user.image;
    this.socket_id = socket.id;

    this.current_record = undefined;
};
util.inherits(Person, EventEmitter);

module.exports = function (user, socket) {
    return new Person(user, socket);
};
