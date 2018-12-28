/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'id' : data['id']
            ,'name' : data['name']
            ,'password' : data['password']
            ,'url' : data['url']
            ,'username' : data['username']
            ,'auth' : data['auth']
        };
        var promise = context.actions['action-edit-camera']({filters: packet});
        context.runningActionsByContainer['view-container-edit-camera'].push(promise);
        promise.then(function (result) {
            context.runningActionsByContainer['view-container-edit-camera'].splice(
                context.runningActionsByContainer['view-container-edit-camera'].indexOf(promise), 1
            );
            if (result.event) {
                context.navigations[result.event](context, result.data);
            }
        });
    };
};
