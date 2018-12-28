/*jslint node: true, nomen: true */
"use strict";

var ko = require('knockout');

exports.register = function () {
    require('./main-application').register();
    require('./c-view-container-camera-details').register();
    require('./c-view-container-edit-camera').register();
    require('./c-view-container-home').register();
    require('./c-details-camera').register();
    require('./c-form-edit-camera').register();
    require('./c-list-camera').register();
        require('./c-system-event-back-2').register();
          require('./c-system-event-back-3').register();
            require('./c-system-event-selected-camera').register();
  };
