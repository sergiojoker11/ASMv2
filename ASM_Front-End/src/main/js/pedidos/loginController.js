'use strict';

angular.module('asm.loginController', [])
        .controller('loginController', function ($scope, $log, authenticationService, modalDialogService, $uibModalInstance, Notification) {

            function openDialog(view, controller, scope, setPromise, successHandler) {
                modalDialogService.openModalInstance(view, controller, scope, setPromise)
                        .then(successHandler, angular.noop());
            }

            function openRegisterDialog() {
                openDialog('pedidos/register.html', 'registerController', $scope, angular.noop(), close);
            }
            
            function openRemindPasswordDialog() {
                openDialog('pedidos/remindPassword.html', 'remindPasswordController', $scope, angular.noop(), close);
            }

            function login() {
                var credentials = {"username": $scope.username, "password": $scope.password};
                authenticationService.authenticate(credentials).then(function (response) {
                    $log.debug("Logueo satisfactorio", response);
                    authenticationService.login(response.data);
                    authenticationService.sendEmail();
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
            $scope.openRemindPasswordDialog = openRemindPasswordDialog;
            $scope.login = login;
            $scope.close = close;
        });

