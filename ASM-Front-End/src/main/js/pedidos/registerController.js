'use strict';

angular.module('asm.registerController', [])
        .controller('registerController', function ($scope, $log, $uibModalInstance, userService, Notification, authenticationService) {

            function register() {
                userService.register($scope.user).then(function (response) {
                    $log.debug("Registro satisfactorio", response);
                    authenticationService.login(response.data);
                    Notification.success('Registro satisfactorio. Nos hemos tomado la libertad de loguearte en el sistema');
                    $scope.close();
                }, function (error) {
                    $log.debug("Registration failure", error);
                    if (error.status === 409) {
                        Notification.error('El nombre de usuario ya existe, elija otro');
                        $scope.registerForm.username.$invalid = true;
                        $scope.user.username = "";
                    } else {
                        Notification.error('Hubo un problema mientras guardabamos tu información. Si el problema persiste, póngase en contacto con el administrador');
                    }
                });
            }

            function close() {
                $uibModalInstance.close();
            }

            function dismiss() {
                $uibModalInstance.dismiss('cancel');
            }

            function initializeDirective() {
                $scope.mode = "register";
                $scope.user = {};
            }

            $scope.register = register;
            $scope.close = close;
            $scope.dismiss = dismiss;
            initializeDirective();
        });

