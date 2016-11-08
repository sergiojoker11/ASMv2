'use strict';

var homeController = angular.module('asm.homeController', []);

homeController.controller('homeController', function($scope, $log) {
    
    $scope.ejecutar = function () {
        $log.debug("Estoy en home controller");
    };
                
});

