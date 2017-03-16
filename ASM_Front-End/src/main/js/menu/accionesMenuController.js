'use strict';

var accionesMenuController = angular.module('asm.accionesMenuController', []);

accionesMenuController.controller('accionesMenuController', ['$scope', '$log', function($scope, $log) {
  
    $scope.menuMostrado = false;
    
    $scope.mostrarMenu = function () {
        $log.debug("Abriendo/cerrando menu");
        $scope.menuMostrado = !$scope.menuMostrado;
    };
}]);

