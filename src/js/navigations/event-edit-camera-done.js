/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-camera-details']) {
            context.top.active('view-container-camera-details');
            context.vms['view-container-camera-details'].init({mask: 'details-camera'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
        };
        context.vms['details-camera'].init({input: packet});
    };
};
