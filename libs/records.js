'use strict';

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    _ = require('lodash'),
    record = require('./record');

var Records = function () {
    this.records = {};
};
util.inherits(Records, EventEmitter);

Records.prototype.getRecord = function(module, page) {
    var name = module + '---' + page;

    if (!_.has(this.records, name)) {
        this.records[name] = new record();
    }

    return this.records[name];
}

module.exports = function () {
    return new Records();
};
