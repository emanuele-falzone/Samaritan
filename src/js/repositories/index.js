/*jslint node: true, nomen: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['camera'] = require('./camera').createRepository(options);
    return repositories;
};
