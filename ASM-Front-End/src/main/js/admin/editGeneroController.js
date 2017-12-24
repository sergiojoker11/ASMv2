'use strict';

angular.module('asm.editGeneroController', [])
        .controller('editGeneroController', function ($scope, $log, catalogoService, Notification, $uibModalInstance, promise) {
            $log.debug("Estoy en editGeneroController", $scope);

            function updateGenero() {
                catalogoService.updateGenero($scope.genero).then(function (response) {
                    $log.debug("Success genero", response);
                    Notification.success("El elemento se ha guardado correctamente");
                    $scope.cancel();
                }, function (error) {
                    $log.debug("error genero", error);
                    Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
                });
            }
            
            function cancel() {
                $uibModalInstance.close();
            }
            
            function isInvalidUserInput(element) {
                return angular.isDefined(element) && element.$invalid && !element.$pristine;
            }
            
            $scope.genero = angular.copy(promise.genero);
            $scope.cancel = cancel;
            $scope.isInvalidUserInput = isInvalidUserInput;
            $scope.updateGenero = updateGenero;
        });