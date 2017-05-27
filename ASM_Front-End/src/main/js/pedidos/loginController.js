'use strict';

angular.module('asm.loginController', [])
        .controller('loginController', function ($scope, $log, authenticationService, modalDialogService, $uibModalInstance, Notification) {

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
                openDialog('pedidos/register.html', 'registerController', $scope, setPromise, close);
            }

            function login() {
                var credentials = {"username": $scope.username, "password": $scope.password};
                authenticationService.authenticate(credentials).then(function (response) {
                    $log.debug("Logueo satisfactorio", response);
                    authenticationService.login(response.data);
                    $scope.close();
                }, function (error) {
                    $log.debug("Ha habido un error mientras logueo", error);
                    Notification.error('Nombre de usuario ó contraseña inválida');
                });
            }
            
            function close() {
                $uibModalInstance.close();
            }

            $scope.openRegisterDialog = openRegisterDialog;
            $scope.login = login;
            $scope.close = close;
        });

