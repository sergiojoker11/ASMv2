'use strict';

var panelControlController = angular.module('asm.panelControlController', []);

panelControlController.controller('panelControlController', function ($scope, $log, productosService) {

    $scope.ejecutar = function () {
        $log.debug("Estoy en panelControlController");
    };

    $scope.insertarProducto = function () {
        productosService.productosFactory.insert($scope.producto1).then(function (response) {
            $log("productosService.insertar() - response", response);
        }, function (error) {
            $log("productosService.insertar() - response", error);
        });
        $log.debug("hemnos llamado a pintar", $scope);
    };

});


