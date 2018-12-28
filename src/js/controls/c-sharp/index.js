"use strict";

var ko = require('knockout');

function ViewModel(params) {
    var self = this;

    self.url = params.url;
    self.auth = params.auth;
    self.username = params.username;
    self.password = params.password;

    self.src = ko.observable('images/noimage.png');

    function getSnapAsync(callback, url, auth, username, password) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        if (auth) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
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
    if(self.url != "") {
        setInterval(function() {
            getSnapAsync(function(base64) {
                self.src('data:image/jpeg;base64,' + base64);
            }, self.url, self.auth, self.username, self.password);
        }, 1000);
    }
}

exports.register = function(options){

    ko.components.register('c-sharp', {
        viewModel: ViewModel,
        template: require('./index.html')
    });
};