/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;

    self.context = params.context;

    self.trigger = params.trigger;
    
    self.listener = function(inEvent){
        // Handling keydown Event
        var keycode;

        if(window.event) { 
            keycode = inEvent.keyCode;
        } else if(e.which) { 
            keycode = inEvent.which;
        } 
        if (keycode == 461 || keycode == 27) {
            self.trigger();
        }
    };

    document.addEventListener("keydown", self.listener, false);
}

ViewModel.prototype.dispose = function() {
    document.removeEventListener("keydown", this.listener, false);
}

ViewModel.prototype.id = 'system-event-back-2';

exports.register = function () {
    ko.components.register('c-system-event-back-2', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                    vm.dispose();
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
