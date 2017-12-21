'use strict';

angular.module('asm.pedidoConfirmacionController', [])
    .controller('pedidoConfirmacionController', function ($scope, $log, $sessionStorage, $location) {
        $log.debug("Estamos en pedidoConfirmacionController", $scope);

        function confirm(){
            $log.debug("STEP 1", $sessionStorage.pedidoStep1);
            $log.debug("STEP 2", $sessionStorage.pedidoStep2);
            $log.debug("CATALOGO", $sessionStorage.catalogo);
        }

        function getFormatosToDisplayFromSessionStorageStep1() {
            var listaFormatos = [];
            angular.forEach($sessionStorage.pedidoStep1, function(val, key, obj){
                listaFormatos.push(obj);
            });
            return listaFormatos;
        }

        function initialize() {
            if (angular.isDefined($sessionStorage.pedidoStep1 && angular.isDefined($sessionStorage.pedidoStep2))) {
                $scope.pedido = $sessionStorage.pedidoStep2;
                $scope.pedido.listaFormatos = getFormatosToDisplayFromSessionStorageStep1();
            } else {
                $location.path("/pedidos");
            }
        }

        $scope.confirm = confirm;
        initialize();
        $scope.print = function () {
            $log.debug("$scope", $scope);
        };
    });