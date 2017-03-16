'use strict';

var inicioController = angular.module('asm.inicioController', []);

inicioController.controller('inicioController', function($scope, $log) {
    
    $scope.ejecutar = function () {
        $log.debug("Estoy en inicioControllerr");
    };
                
});

