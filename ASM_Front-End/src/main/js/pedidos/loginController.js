'use strict';

angular.module('asm.loginController', [])
        .controller('loginController', function ($scope, $log, authenticationService, modalDialogService, $uibModalInstance, alertService) {

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
                var credentials = {"username": $scope.username, "password": $scope.password};
                authenticationService.login(credentials).then(function (response) {
                    $log.debug("Logueo satisfactorio", response);
                    alertService.addAlert('success', 'Bienvenido '+$scope.username, 0);
                    $scope.close();
                }, function (error) {
                    $log.debug("Ha habido un error mientras logueo", error);
                    alertService.addAlert('error', 'Nombre de usuario ó contraseña inválida', 0);
                });
            }
            
            function close() {
                $uibModalInstance.close();
            }

            $scope.openRegisterDialog = openRegisterDialog;
            $scope.login = login;
            $scope.close = close;
        });

