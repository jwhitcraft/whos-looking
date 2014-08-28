'use strict';

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    _ = require('lodash'),
    record = require('./record');

var Records = function () {
    this.records = {};
};
util.inherits(Records, EventEmitter);

Records.prototype.getRecord = function(module, action, id) {
    var name = module + '---' + action;

    if (!_.isUndefined(id)) {
        name += '---' + id;
    }

    if (!_.has(this.records, name)) {
        this.records[name] = new record(name);
    }

    return this.records[name];
}

Records.prototype.getRecordByName = function(name) {
    if (_.has(this.records, name)) {
        return this.records[name];
    }

    return undefined;
}

module.exports = function () {
    return new Records();
};
