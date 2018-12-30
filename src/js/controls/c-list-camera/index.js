/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    $ = require('jquery'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self._repository = params.context.repositories['camera'];
    self.context = params.context;
    self.status = ko.observable('');
    self.selected = ko.observable(undefined);
    self.items = ko.observableArray([]);

    self.select = function() {
        self.selected(this.id);
        self.output = this;
        self.trigger.call(this, 'event-selected-camera');
    };

    self.trigger = function (id) {
        self.context.navigations[id](self.context, this);
    };

    self.focus = -1;

    self.listener = function(inEvent){
        // Handling keydown Event
        var keycode;

        if(window.event) { 
            keycode = inEvent.keyCode;
        } else if(e.which) { 
            keycode = inEvent.which;
        } 

        if(self.focus == -1 && keycode >= 37 && keycode <= 40) {
            self.focus = 0;
            $(".move")[self.focus].focus();
        } else {

            // ARROW RIGHT
            if (keycode == 39) { 
                if (self.focus % 3 < 2) {
                    self.focus++;
                    $(".move")[self.focus].focus();
                }
            }

            // ARROW LEFT
            if (keycode == 37) {      
                if (self.focus % 3 > 0) {
                    self.focus--;
                    $(".move")[self.focus].focus();
                }
            }

            // ARROW up
            if (keycode == 38) {  
                if (self.focus > 2) {
                    self.focus-=3;
                    $(".move")[self.focus].focus();
                }
            }

            // ARROW DOWN
            if (keycode == 40) {      
                if (self.focus < 6) {
                    self.focus+=3;
                    $(".move")[self.focus].focus();
                }
            }

            // ENTER / OK
            if (keycode == 13) {      
                $(".move:focus").click();
            }

        }
    };

    document.addEventListener("keydown", self.listener, false);
}

ViewModel.prototype.id = 'list-camera';

ViewModel.prototype.fields = {
    id: 1
    ,'auth': 1
    ,'name': 1
    ,'password': 1
    ,'url': 1
    ,'username': 1
};

ViewModel.prototype.dispose = function() {
    document.removeEventListener("keydown", this.listener, false);
}

ViewModel.prototype.waitForStatusChange = function () {
    return this._computing ||
           this._initializing ||
           Promise.resolve();
};

ViewModel.prototype._compute = function() {
    if (this._computing) {
        this._computing.cancel();
    }
    var self = this;
    this._computing = this._repository.find(this.filters, this.fields).then(function (items) {
        self.selected(undefined);
        self.items(items);
        if (items.length) {
            self.selected(items[0].id);
            self.output = items[0];
        }
        $('.collapsible').collapsible();
        self.status('computed');
        self._computing = undefined;
    });
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.filters = options.input || {};
    this.status('ready');
    var self = this;
    this._initializing = new Promise(function (resolve) {
        setTimeout(function () {
            self._compute();
            resolve();
            self._initializing = undefined;
        }, 1);
    });
};

exports.register = function () {
    ko.components.register('c-list-camera', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { 
                    vm.dispose();
                    delete params.context.vms[vm.id]; 
                });
                return vm;
            }
        },
        template: require('./index.html'),
        synchronous: true
    });
};
