'use strict';

var panelControlController = angular.module('asm.panelControlController', []);

panelControlController.controller('panelControlController', function ($scope, $log, productosService) {

    $scope.ejecutar = function () {
        $log.debug("Estoy en panelControlController");
    };

    $scope.insertarProducto = function () {
        productosService.insertar($scope.producto1).then(function (response) {
            $log.debug("productosService.insertar() - response", response);
        }, function (error) {
            $log.debug("productosService.insertar() - response", error);
        });
        $log.debug("hemnos llamado a pintar", $scope);
    };

});


