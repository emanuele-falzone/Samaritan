/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    this.db = Promise.promisifyAll(new DataStore({
        filename: 'camera',
        inMemoryOnly: true
    }));
    this.db.insert(require('./default'));
}

Repository.prototype.findById = function (id) {
    return this.db.findOneAsync({id: id});
};

Repository.prototype.find = function (fields, project) {
    return this.db.findAsync(fields, project);
};

Repository.prototype.insert = function (fields) {
    return this.db.insertAsync(fields);
};

Repository.prototype.update = function (fields) {
    return this.db.updateAsync({id: fields.id}, fields, {});
};

Repository.prototype.remove = function (id) {
    return this.db.removeAsync({id: id}, {});
};

exports.createRepository = Repository;
