'use strict';

angular.module('asm.catalogoPedido', [])
    .directive("catalogoPedido", function () {
        return {
            restrict: "E",
            templateUrl: 'directives/catalogoPedido.html',
            scope: {
                catalogo: '=',
                pedido: '=',
                mode: '='
            },
            controller: function ($log, $scope, catalogoService, Notification, $sessionStorage) {

                function getGeneros() {
                    catalogoService.getGeneros().then(function (response) {
                        $scope.catalogo = response.data._embedded.generoes;
                    }, function () {
                        Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
                    });
                }

                function getProductosByGenero(genero) {
                    catalogoService.getProductos(genero._links.productosList.href).then(function (response) {
                        genero.productosList = response.data._embedded.productoes;
                    }, function () {
                        Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
                    });
                }

                function initializePedidoByFormatos(formatosList) {
                    angular.forEach(formatosList, function (formato) {
                        if (angular.isUndefined($scope.pedido[formato.id])) {
                            $scope.pedido[formato.id] = 0;
                        }
                    });
                }

                function isEditMode() {
                    return $scope.mode === 'edit';
                }

                function isReadonly() {
                    return $scope.mode === 'readonly';
                }

                function initialize() {
                    $log.debug("DENTRO DIRECTIVA", $scope);
                    if (isEditMode()) {
                        getGeneros();
                    }
                }

                $scope.getProductosByGenero = getProductosByGenero;
                $scope.initializePedidoByFormatos = initializePedidoByFormatos;
                $scope.isEditMode = isEditMode;
                $scope.isReadonly = isReadonly;
                initialize();
            }
        };
    });