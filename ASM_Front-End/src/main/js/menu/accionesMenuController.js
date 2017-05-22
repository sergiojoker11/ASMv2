'use strict';

angular.module('asm.accionesMenuController', [])
        .controller('accionesMenuController', function($scope) {
  
    $scope.menuMostrado = false;
    
    $scope.mostrarMenu = function () {
        if ($scope.width<=767) {
            $scope.menuMostrado = !$scope.menuMostrado;
        }
    };
    
    $scope.$on('widthChange', function (){
        if ($scope.width>767) {
            $scope.menuMostrado = false;
        }
    });
});

