'use strict';

angular.module('asm.pedidoConfirmacionController', [])
    .controller('pedidoConfirmacionController', function ($scope, $log) {
        $log.debug("Estamos en pedidoConfirmacionController", $scope);

        $scope.print = function () {
            $log.debug("$scope", $scope);
        };
    });