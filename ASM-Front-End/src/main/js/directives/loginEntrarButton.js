'use strict';

angular.module('asm.loginEntrarButton', [])
    .directive("loginEntrarButton", function () {
        return {
            restrict: "E",
            templateUrl: 'directives/loginEntrarButton.html',
            controller: function ($log, $scope, authenticationService, $rootScope, modalDialogService) {

                var pollingPromise;

                function setPromise(promiseIn) {
                    pollingPromise = promiseIn;
                }

                function openDialog(view, controller, scope, setPromise, successHandler) {
                    var partialCloseDialog = angular.bind(this, modalDialogService.closeDialog, pollingPromise);
                    modalDialogService.openModalInstance(view, controller, scope, setPromise)
                        .then(successHandler, partialCloseDialog);
                }

                function openEntrarDialog() {
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
                    authenticationService.logout();
                }

                function loginWithCredentialsFromLocalStorageIfThereAre() {
                    authenticationService.loginWithCredentialsFromLocalStorageIfThereAre();
                }

                loginWithCredentialsFromLocalStorageIfThereAre();
                $scope.openEntrarDialog = openEntrarDialog;
                $scope.getEntrarButtonText = getEntrarButtonText;
                $scope.isAuthenticated = authenticationService.isAuthenticated;
                $scope.isAdmin = authenticationService.isAdmin;
                $scope.logout = logout;
            }
        };

    });