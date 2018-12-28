/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery');

exports.register = function () {
    ko.components.register('main-application', {
        viewModel: function(params) {
            var self = this,
                defaultChild = 'view-container-home';
            self.context = params.context;
            self.active = ko.observable(undefined);

            self.landmark = function (id) {
                self.active(id);
                self.context.vms[id].init();
                $(".button-collapse").sideNav('hide');
            };
            self.init = function () {
                self.active(defaultChild);
                if (self.context.vms[defaultChild]) {
                    self.context.vms[defaultChild].init();
                }
            };

            self.context.top = self;

            $(".button-collapse").sideNav();
        },
        template: require('./index.html'),
        synchronous: true
    });
};
