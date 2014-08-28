'use strict';

var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    util = require('util');

var Record = function () {
    EventEmitter.call(this);

    this.lookers = {};
};
util.inherits(Record, EventEmitter);

Record.prototype.addLooker = function (looker) {
    if(!this.hasLooker(looker)) {
        this.lookers[looker.id] = looker
    }
};

Record.prototype.removeLooker = function(looker) {
    if(this.hasLooker(looker)) {
        delete this.lookers[looker.id]
    }
}

Record.prototype.hasLooker = function(looker) {
    return (_.has(this.lookers, looker.id));
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

module.exports = function () {
    return new Record();
};
