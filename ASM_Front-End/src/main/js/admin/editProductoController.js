'use strict';

angular.module('asm.editProductoController', [])
        .controller('editProductoController', function ($log, $scope, Notification, catalogoService, $uibModalInstance, promise) {
            
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
            
            catalogoService.getImageProducto($scope.producto).then(function (response) {
                    $scope.producto.image = new Blob([response.data], {type: 'image/*'});
                }, function (error) {
                    $log.debug("error image producto", error);
                });            
            $scope.producto = angular.copy(promise.producto);
            $scope.updateProducto = updateProducto;
            $scope.removeImage = removeImage;
            $scope.isInvalidUserInput = isInvalidUserInput;
            $scope.cancel = cancel;
        });