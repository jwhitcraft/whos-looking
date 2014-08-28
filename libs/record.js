'use strict';

var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    util = require('util');

var Record = function (name) {
    EventEmitter.call(this);
    this.name = name;
    this.lookers = {};
};
util.inherits(Record, EventEmitter);

Record.prototype.addLooker = function (looker) {
    if(!this.hasLooker(looker)) {
        this.lookers[looker.socket_id] = looker
        looker.current_record = this.name;
    }
};

Record.prototype.removeLooker = function(looker) {
    if(this.hasLooker(looker)) {
        delete this.lookers[looker.socket_id]
        looker.current_record = undefined;
    }
}

Record.prototype.hasLooker = function(looker) {
    return (_.has(this.lookers, looker.socket_id));
}

Record.prototype.count = function() {
    return _.size(this.lookers);
}

Record.prototype.getLookers = function() {
    return this.lookers;
}

Record.prototype.isEmpty = function() {
    return _.isEmpty(this.lookers);
}

module.exports = function (name) {
    return new Record(name);
};
