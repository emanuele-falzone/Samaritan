/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context) {
        if (!context.vms['view-container-home']) {
            context.top.active('view-container-home');
        }
        context.vms['view-container-home'].init();
    };
};
