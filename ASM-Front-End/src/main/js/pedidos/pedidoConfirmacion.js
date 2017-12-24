'use strict';

angular.module('asm.pedidoConfirmacionController', [])
    .controller('pedidoConfirmacionController', function ($scope, $log, $sessionStorage, $location, pedidosService, Notification, modalDialogService, $window) {

        function resetPedidoInfo(){
            delete $sessionStorage.pedidoStep1;
            delete $sessionStorage.pedidoStep2;
            delete $sessionStorage.catalogo;
        }

        function confirm(){
            pedidosService.checkout($scope.pedido).then(function (response) {
                resetPedidoInfo();
                Notification.success("Su pedido ha sido realizado. En breves, nos dispondremos a procesar su pedido.");
                $window.open($location.host()+":"+ $location.port()+"/ASM_Back-End/facturas/"+ response.data+"/pdf.pdf", '_blank');
                $location.path("/pedidos");
            }, function (error) {
                $log.debug("Hubo un error procesando su pedido", error);
                Notification.error("No se ha podido realizar su pedido. Si el error persiste, póngase en contacto con el administrador");
            });
        }

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

        function initialize() {
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
    });