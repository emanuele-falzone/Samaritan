/*jslint node: true, nomen: true */
"use strict";

exports.createActions = function (options) {
    return {
        'action-edit-camera': require('./action-edit-camera').createAction(options)
    };
};
