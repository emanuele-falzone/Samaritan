/*jslint node: true, nomen: true */
"use strict";

exports.createNavigations = function (options) {
    return {
        'event-edit-camera-done': require('./event-edit-camera-done').createNavigation(options)
        ,'system-event-back-2': require('./system-event-back-2').createNavigation(options)
        ,'event-edit-camera': require('./event-edit-camera').createNavigation(options)
        ,'system-event-back-3': require('./system-event-back-3').createNavigation(options)
        ,'event-edit-camera-save': require('./event-edit-camera-save').createNavigation(options)
        ,'event-selected-camera': require('./event-selected-camera').createNavigation(options)
        ,'system-event-selected-camera': require('./system-event-selected-camera').createNavigation(options)
    };
};
