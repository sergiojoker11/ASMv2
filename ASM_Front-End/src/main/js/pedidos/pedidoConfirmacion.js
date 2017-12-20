'use strict';

angular.module('asm.pedidoConfirmacionController', [])
    .controller('pedidoConfirmacionController', function ($scope, $log, $sessionStorage) {
        $log.debug("Estamos en pedidoConfirmacionController", $scope);

        function confirm(){
            $log.debug("STEP 1", $sessionStorage.pedidoStep1);
            $log.debug("STEP 2", $sessionStorage.pedidoStep2);
        }

        $scope.confirm = confirm;
        $scope.print = function () {
            $log.debug("$scope", $scope);
        };
    });