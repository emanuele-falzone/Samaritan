/*jslint node: true, nomen: true */
"use strict";

exports.createNavigation = function () { // add "options" parameter if needed
    return function (context, data) {
        if (!context.vms['view-container-edit-camera']) {
            context.top.active('view-container-edit-camera');
            context.vms['view-container-edit-camera'].init({mask: 'form-edit-camera'});
        }
        data = data || {};
        var packet = {
            'id' : data['id']
            ,'name' : data['name']
            ,'password' : data['password']
            ,'url' : data['url']
            ,'username' : data['username']
            ,'auth' : data['auth']
        };
        context.vms['form-edit-camera'].init({input: packet});
    };
};
