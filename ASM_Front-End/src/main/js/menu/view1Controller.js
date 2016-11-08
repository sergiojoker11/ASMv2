'use strict';

var view1Controller = angular.module('asm.view1Controller', []);

view1Controller.controller('view1Controller', function($log) {
        $log.debug("Estoy en view1 controller");
});

