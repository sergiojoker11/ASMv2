'use strict';

angular.module('asm.loginController', [])
        .controller('loginController', function ($scope, $log, authenticationService, modalDialogService, $uibModalInstance) {

            $log.debug("LoginController scope", $scope);
            var pollingPromise;

            function setPromise(promiseIn) {
                pollingPromise = promiseIn;
            }

            function openDialog(view, controller, scope, setPromise, successHandler) {
                var partialCloseDialog = angular.bind(this, modalDialogService.closeDialog, pollingPromise);
                modalDialogService.openModalInstance(view, controller, scope, setPromise)
                        .then(successHandler, partialCloseDialog);
            }

            function openRegisterDialog() {
                openDialog('pedidos/register.html', 'registerController', $scope, setPromise, angular.noop());
            }

            function login() {
                authenticationService.login($scope.username, $scope.password).then(function (response) {
                    $log.debug("Logueo satisfactorio", response);
                    $scope.close();
                }, function (error) {
                    $log.debug("Ha habido un error mientras logueo", error);
                    //FlashService.Error(error.message);
                });
            }
            
            function close() {
                $uibModalInstance.close();
            }

            $scope.openRegisterDialog = openRegisterDialog;
            $scope.login = login;
            $scope.close = close;
        });

