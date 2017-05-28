'use strict';

angular.module('asm.remindPasswordController', [])
        .controller('remindPasswordController', function ($scope, $log, $uibModalInstance, userService, Notification) {

            function remindPassword() {
                userService.remindPassword($scope.email).then(function (response) {
                    $log.debug("Solicitud de recordatorio de password satisfactoria", response);
                    Notification.success('Solicitud de recordatorio de password enviada satisfactoriamente');
                    $scope.dismiss();
                }, function (error) {
                    $log.debug("Solicitud de recordatorio de password fallida", error);
                    Notification.error('Hubo un problema mientras enviabamos su solicitud. Si el problema persiste, póngase en contacto con el administrador');
                });
            }

            function close() {
                $uibModalInstance.close();
            }

            function dismiss() {
                $uibModalInstance.dismiss('cancel');
            }
            
            function isInvalidUserInput(element) {
                return angular.isDefined(element) && element.$invalid && !element.$pristine;
            }

            $scope.remindPassword = remindPassword;
            $scope.close = close;
            $scope.dismiss = dismiss;
            $scope.isInvalidUserInput = isInvalidUserInput;
        });

