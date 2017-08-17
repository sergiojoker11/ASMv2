'use strict';

angular.module('asm.editProductoController', [])
        .controller('editProductoController', function ($log, $scope, Notification, catalogoService, $uibModalInstance, promise) {
            
            $scope.formato = {};

            function updateProducto() {
                catalogoService.updateProducto($scope.producto).then(function (response) {
                    $log.debug("Success producto", response);
                    Notification.success("El elemento se ha guardado correctamente");
                    $scope.cancel();
                }, function (error) {
                    $log.debug("error producto", error);
                    Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
                });
            }

            function removeImage() {
                $scope.producto.image = undefined;
            }

            function isInvalidUserInput(element) {
                return angular.isDefined(element) && element.$invalid && !element.$pristine;
            }

            function cancel() {
                $uibModalInstance.close();
            }
            
            function addFormato() {
                $log.debug("$scope - addFormato", $scope);
                $scope.producto.listaFormatos.push($scope.formato);
                $scope.formato = {};
            }
            
            function removeFormato(index) {
                $scope.producto.listaFormatos.splice(index, 1);
            }
            
            function isListaFormatosEmpty() {
                return $scope.producto.listaFormatos.length === 0;
            }

            catalogoService.getImageProducto($scope.producto).then(function (response) {
                if (response.data.byteLength > 0) {
                    $scope.producto.image = new Blob([response.data], {type: 'image/*'});
                } else {
                    $scope.producto.image = undefined;
                }
            }, function (error) {
                $log.debug("error image producto", error);
            });
            $scope.producto = angular.copy(promise.producto);
            $scope.updateProducto = updateProducto;
            $scope.removeImage = removeImage;
            $scope.isInvalidUserInput = isInvalidUserInput;
            $scope.cancel = cancel;
            $scope.addFormato = addFormato;
            $scope.removeFormato = removeFormato;
            $scope.isListaFormatosEmpty = isListaFormatosEmpty;
        });