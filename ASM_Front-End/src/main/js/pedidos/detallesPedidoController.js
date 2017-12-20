'use strict';

angular.module('asm.detallesPedidoController', [])
    .controller('detallesPedidoController', function ($scope, $log, $location, authenticationService, $sessionStorage) {

        function isInvalidUserInput(element) {
            return angular.isDefined(element) && element.$invalid && !element.$pristine;
        }

        function setDatePickerParams() {
            $scope.minDate = new Date();
            $scope.pedido.date = new Date();
        }

        function next() {
            $sessionStorage.pedidoStep2 = $scope.pedido;
            $location.path("/pedidos/detalles/confirmacion");
        }

        function initialize() {
            if (angular.isDefined($sessionStorage.pedidoStep2)) {
                $scope.pedido = $sessionStorage.pedidoStep2;
            } else {
                $scope.pedido = {};
                setDatePickerParams();
            }
            $scope.pedido.user = authenticationService.getUserDetails();
        }

        $scope.isInvalidUserInput = isInvalidUserInput;
        $scope.next = next;
        initialize();
    });