/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) {
        return new Repository(options);
    }

    var self = this;

    this.db = Promise.promisifyAll(new DataStore({
        filename: 'camera',
        autoload: true
    }));
}

Repository.prototype.check = function () {
    var self = this;
    return this.db.countAsync({})
        .then(function (count) {
            if (count == 0) {
                return self.db.insertAsync(require('./default'));
            }
        });
};

Repository.prototype.findById = function (id) {
    var self = this;
    return this.check().then(function(){
        return self.db.findOneAsync({id: id});
    });
};

Repository.prototype.find = function (fields, project) {
    var self = this;
    return this.check().then(function(){
        return self.db.findAsync(fields, project);
    });
};

Repository.prototype.insert = function (fields) {
    var self = this;
    return this.check().then(function(){
        return self.db.insertAsync(fields);
    });
};

Repository.prototype.update = function (fields) {
    var self = this;
    return this.check().then(function(){
        return self.db.updateAsync({id: fields.id}, fields, {});
    });
};

Repository.prototype.remove = function (id) {
    var self = this;
    return this.check().then(function(){
        return self.db.removeAsync({id: id}, {});
    });
};

exports.createRepository = Repository;
