'use strict';

angular.module('asm.pedidoConfirmacionController', [])
    .controller('pedidoConfirmacionController', function ($scope, $log, $sessionStorage, $location, pedidosService, Notification, modalDialogService) {

        function openConfirmationModal() {
            $scope.confirmationModalData = modalDialogService.setUpConfirmationModal("Realizar pedido", "¿Quiere confirmar el pedido?");
            var action = angular.bind(this, confirm);
            modalDialogService.openModalInstance('utils/confirmationDialogView.html', 'confirmationDialogController', $scope).then(function () {
                action().then(function () {
                }, function () {
                    Notification.error("No se ha podido realizar su pedido. Si el error persiste, póngase en contacto con el administrador");
                });
            }, angular.noop);
        }

        function resetPedidoInfo(){
            delete $sessionStorage.pedidoStep1;
            delete $sessionStorage.pedidoStep2;
            delete $sessionStorage.catalogo;
            $log.debug("STEP 1", $sessionStorage.pedidoStep1);
            $log.debug("STEP 2", $sessionStorage.pedidoStep2);
            $log.debug("CATALOGO", $sessionStorage.catalogo);
            $log.debug("PEDIDO", $scope.pedido);
        }

        function confirm(){
            pedidosService.checkout($scope.pedido).then(function (response) {
                resetPedidoInfo();
                Notification.success("Su pedido ha sido realizado. En breves, nos dispondremos a procesar su pedido.");
                // $location.path("/facturas/"+ response.data.facturaId)
            }, function (error) {
                Notification.error("No se ha podido realizar su pedido. Si el error persiste, póngase en contacto con el administrador");
            });
        }

        function initialize() {
            $log.debug("initialize");
            if (angular.isDefined($sessionStorage.pedidoStep1 && angular.isDefined($sessionStorage.pedidoStep2))) {
                $scope.pedido = $sessionStorage.pedidoStep2;
                $scope.pedido.items = $sessionStorage.catalogo;
                $scope.mode = "readonly";
            } else {
                $location.path("/pedidos");
            }
        }

        $scope.openConfirmationModal = openConfirmationModal;
        initialize();
        $scope.print = function () {
            $log.debug("$scope", $scope);
        };
    });