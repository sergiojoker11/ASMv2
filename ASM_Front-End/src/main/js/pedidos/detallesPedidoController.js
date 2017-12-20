'use strict';

angular.module('asm.detallesPedidoController', [])
    .controller('detallesPedidoController', function ($scope, $log) {
        $log.debug("Estamos en detalles pedido Controller", $scope);
        $scope.print = function () {
            $log.debug("$scope", $scope);
        };
    });