'use strict';

angular.module('asm.accionesMenuController', [])
        .controller('accionesMenuController', function($scope, $location) {
  
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

    function showLoginEntrarButton() {
        return $location.path().indexOf("/pedidos") !== -1;
    }

    $scope.showLoginEntrarButton = showLoginEntrarButton;

});

