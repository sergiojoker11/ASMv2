'use strict';

angular.module('asm.inicioController', [])
        .controller('inicioController', function($scope, $log) {
    
    $scope.ejecutar = function () {
        $log.debug("Estoy en inicioControllerr");
    };
                
});

