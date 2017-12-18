'use strict';

angular.module('asm.genero', [])
        .directive("genero", function () {
            return {
                restrict: "E",
                templateUrl: 'admin/genero.html',
                replace: true,
                scope: {
                    genero: '='
                },
                controller: function ($log, $scope, catalogoService, Notification, modalDialogService) {

                    function getProductos() {
                        catalogoService.getProductos($scope.genero._links.productosList.href).then(function (response) {
                            $scope.productos.list = response.data._embedded.productoes;
                        }, function () {
                            Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
                        });
                    }

                    function setupProductoForEditing(index) {
                        $scope.producto = angular.copy($scope.productos.list[index]);
                    }
                    
                    function openConfirmationModal(action, actionSuccessMessageKey) {
                        modalDialogService.openModalInstance('utils/confirmationDialogView.html', 'confirmationDialogController', $scope).then(function () {
                            action().then(function () {
                                getProductos();
                                Notification.success(actionSuccessMessageKey);
                            }, function () {
                                Notification.error("No se ha podido eliminar el producto. Si el error persiste, póngase en contacto con el administrador");
                            });
                        }, angular.noop);
                    }

                    function confirmProductoDeletionModal(productoId) {
                        setupProductoForEditing(productoId);
                        $scope.confirmationModalData = modalDialogService.setUpConfirmationModal("Eliminar Producto", "¿Realmente desea eliminar este producto junto con todos sus formatos?");
                        var action = angular.bind(this, catalogoService.deleteProducto, $scope.producto);
                        openConfirmationModal(action, 'El producto ha sido eliminado, así como sus formatos');
                    }
                    
                    function openDialog(view, controller, scope, setPromise, successHandler) {
                        var partialCloseDialog = angular.bind(this, modalDialogService.closeDialog);
                        modalDialogService.openModalInstance(view, controller, scope, setPromise)
                                .then(successHandler, partialCloseDialog);
                    }

                    function openEditProductoModal(productoId) {
                        setupProductoForEditing(productoId);
                        $scope.producto.image = new File([$scope.producto.image], "image.jpg", {type: "image/*"});
                        var promise = {producto: $scope.producto};
                        openDialog('admin/editProducto.html', 'editProductoController', $scope, promise, angular.noop());
                    }

                    $scope.producto = {};
                    $scope.productos = {list: []};
                    getProductos();
                    $scope.openEditProductoModal = openEditProductoModal;
                    $scope.confirmProductoDeletionModal = confirmProductoDeletionModal;
                }
            };

        });