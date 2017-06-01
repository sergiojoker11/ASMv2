'use strict';

angular.module('asm.pedidosController', [])
        .controller('pedidosController', function ($scope, $log, modalDialogService, $rootScope, authenticationService) {
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
            
            function openDownloadStaticDataDialog() {
                openDialog('pedidos/login.html', 'loginController', $scope, setPromise, angular.noop());
            }
            
            function getEntrarButtonText() {
                if (authenticationService.isAuthenticated()) {
                    return $rootScope.user.username;
                } else {
                    return "Entrar";
                }
            }
            
            function logout() {
                return authenticationService.logout();
            }
            
            $scope.openDownloadStaticDataDialog = openDownloadStaticDataDialog;
            $scope.getEntrarButtonText = getEntrarButtonText;
            $scope.isAuthenticated = authenticationService.isAuthenticated;
            $scope.isAdmin = authenticationService.isAdmin;
            $scope.logout = logout;
        });

