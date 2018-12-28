/*jslint node: true, nomen: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {
    this.collection = options.repositories.camera;
}

Action.prototype.run = function (parameters, solve) {
    // Parameters:
    // parameters['auth']
    // parameters['id']
    // parameters['name']
    // parameters['password']
    // parameters['url']
    // parameters['username']

    this.collection.update(parameters)
        .then(function () {
            Materialize.toast('Edit Camera', 2000);
            solve({
                event: 'event-edit-camera-done', // done
                data: {
                    'id': parameters['id'],
                }
            });
        })
};

exports.createAction = function (options) {
    var action = new Action(options);
    return function (data) {
        return new Promise(function (solve, reject, onCancel) {
            var parameters = (data && data.filters) || {};
            action.run(parameters, solve, onCancel);
        });
    };
};

