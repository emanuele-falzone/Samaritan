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
    self.item = ko.observable(undefined);

    self.trigger = function (id) {
        self.context.navigations[id](self.context, self.item());
    };

    self.listener = function(inEvent){
        // Handling keydown Event
        var keycode;

        if(window.event) { 
            keycode = inEvent.keyCode;
        } else if(e.which) { 
            keycode = inEvent.which;
        } 

        // ONE OF THE ARROWS
        if(keycode >= 37 && keycode <= 40) {
            $("#btn").focus();
        }

        // ENTER / OK
        if (keycode == 13) {      
            $(".move:focus").click();
        }

    };

    document.addEventListener("keydown", self.listener, false);
}

ViewModel.prototype.id = 'details-camera';

ViewModel.prototype.dispose = function() {
    document.removeEventListener("keydown", this.listener, false);
}

ViewModel.prototype.fields = {
    id: 1
    ,'auth': 1
    ,'name': 1
    ,'password': 1
    ,'url': 1
    ,'username': 1
};

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
    this._computing = this._repository.findById(this.filters.id, this.fields).then(function (item) {
        self.output = item;
        self.item(item);
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
    ko.components.register('c-details-camera', {
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
