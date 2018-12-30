/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout'),
    Promise = require('bluebird');

function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.status = ko.observable('');
    self.fields = ko.observable({});
    self.errors = ko.observable({});

    self.trigger = function (id) {
        self.context.navigations[id](self.context, self.output);
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

            // ARROW RIGHT OR DOWN
            if (keycode == 39 || keycode == 40) {
                var len = $(".move").length;
                if (self.focus >= len - 1) {
                    self.focus = 0;
                } else {
                    self.focus++;
                }
                $(".move")[self.focus].focus();
            }

            // ARROW LEFT OR UP
            if (keycode == 37 || keycode == 38) { 
                var len = $(".move").length;
                if (self.focus == 0) {
                    self.focus = len - 1;
                } else {
                    self.focus--;
                }
                $(".move")[self.focus].focus();
            }

            // ENTER / OK
            if (keycode == 13) {      
                $(".move:focus").click();
            }

        }
    };

    document.addEventListener("keydown", self.listener, false);
}

ViewModel.prototype.id = 'form-edit-camera';

ViewModel.prototype.waitForStatusChange = function () {
    return this._initializing ||
           Promise.resolve();
};

ViewModel.prototype.dispose = function() {
    document.removeEventListener("keydown", this.listener, false);
}

ViewModel.prototype._compute = function () {
    this.output = {
        'auth': this.input['auth'],
        'id': this.input['id'],
        'name': this.input['name'],
        'password': this.input['password'],
        'url': this.input['url'],
        'username': this.input['username'],
    }
    var self = this,
        fields = {
            'auth': ko.observable(this.input['auth']),
            'id': ko.observable(this.input['id']),
            'name': ko.observable(this.input['name']),
            'password': ko.observable(this.input['password']),
            'url': ko.observable(this.input['url']),
            'username': ko.observable(this.input['username']),
        },
        errors = {
            'auth': ko.observable(this.input['auth-error']),
            'id': ko.observable(this.input['id-error']),
            'name': ko.observable(this.input['name-error']),
            'password': ko.observable(this.input['password-error']),
            'url': ko.observable(this.input['url-error']),
            'username': ko.observable(this.input['username-error']),
        };
    fields['auth'].subscribe(function (value) {
        self.output['auth'] = value;
        //self.errors()['auth'](undefined);
    });
    fields['id'].subscribe(function (value) {
        self.output['id'] = value;
        self.errors()['id'](undefined);
    });
    fields['name'].subscribe(function (value) {
        self.output['name'] = value;
        self.errors()['name'](undefined);
    });
    fields['password'].subscribe(function (value) {
        self.output['password'] = value;
        self.errors()['password'](undefined);
    });
    fields['url'].subscribe(function (value) {
        self.output['url'] = value;
        self.errors()['url'](undefined);
    });
    fields['username'].subscribe(function (value) {
        self.output['username'] = value;
        self.errors()['username'](undefined);
    });
    this.fields(fields);
    this.errors(errors);
    this.status('computed');
};


ViewModel.prototype.init = function (options) {
    options = options || {};
    this.output = undefined;
    this.fields({});
    this.errors({});
    this.input = options.input || {};
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
    ko.components.register('c-form-edit-camera', {
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
