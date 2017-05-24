'use strict';

angular.module('asm.pedidosController', [])
        .controller('pedidosController', function ($scope, $log, modalDialogService) {
            $log.debug("Estoy en pedidosController");
            
            var pollingPromise;

            function setPromise(promiseIn) {
                pollingPromise = promiseIn;
            }

            function openDialog(view, controller, scope, setPromise, successHandler) {
                var partialCloseDialog = angular.bind(this, modalDialogService.closeDialog, pollingPromise);
                modalDialogService.openModalInstance(view, controller, scope, setPromise)
                        .then(successHandler, partialCloseDialog);
            }
            
            $scope.openDownloadStaticDataDialog = function () {
                openDialog('pedidos/login.html', 'loginController', $scope, setPromise, angular.noop());
            };
        });

