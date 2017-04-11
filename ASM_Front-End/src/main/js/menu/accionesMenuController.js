'use strict';

var accionesMenuController = angular.module('asm.accionesMenuController', []);

accionesMenuController.controller('accionesMenuController', ['$scope', function($scope) {
  
    $scope.menuMostrado = false;
    
    $scope.mostrarMenu = function () {
        $scope.menuMostrado = !$scope.menuMostrado;
    };
    
    $scope.$on('widthChange', function (){
        if ($scope.width>767) {
            $scope.menuMostrado = false;
        }
    });
}]);

