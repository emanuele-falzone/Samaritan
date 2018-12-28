"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;

    self.url = params.url;
    self.user = params.user;
    self.pwd = params.pwd;

    self.src = ko.observable();

    function getSnapAsync(callback, url, user, pwd) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        if (user && pwd) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(user + ':' + pwd));
        }

        xhr.onload = function(e) {

            if (this.status == 200) {
                var uInt8Array = new Uint8Array(this.response),
                    binaryString = new Array(i);

                for (var i = 0; i < uInt8Array.length; i++) {
                    binaryString[i] = String.fromCharCode(uInt8Array[i]);
                }
                
                callback(btoa(binaryString.join('')));
            }
        };

        xhr.send();
    }

    setInterval(function() {
        getSnapAsync(function(base64) {
            self.src('data:image/jpeg;base64,' + base64);
        }, self.url, self.user, self.pwd);
    }, 1000);
}

exports.register = function(options){

    ko.components.register('c-sharp', {
        viewModel: ViewModel,
        template: require('./index.html')
    });
};