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
                    Notification.error('Hubo un problema mientras guardabamos tu información');
                });
            }

            function close() {
                $uibModalInstance.close();
            }

            function dismiss() {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.register = register;
            $scope.close = close;
            $scope.dismiss = dismiss;
        });

