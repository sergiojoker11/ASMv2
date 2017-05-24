'use strict';

angular.module('asm.registerController', [])
        .controller('registerController', function ($scope, $log, $uibModalInstance, userService) {

            $log.debug("registerController scope", $scope);
            function register() {
                $log.debug("Has presionado Registrar");
                userService.register($scope.user).then(function (response) {
                    $log.debug("Registro satisfactorio", response);
                    $scope.close();
                    //FlashService.Success('Registration successful', true);
                }, function (error) {
                    $log.debug("Registration failure", error);
                    //FlashService.Error(error.message);
                });
            }

            $scope.close = function () {
                $uibModalInstance.close();
            };

            $scope.register = register;
        });

