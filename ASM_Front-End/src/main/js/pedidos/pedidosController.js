'use strict';

angular.module('asm.pedidosController', [])
    .controller('pedidosController', function ($scope, $log, modalDialogService, $rootScope, authenticationService, catalogoService, $sessionStorage, $route, $location) {

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
            return authenticationService.logout();
        }

        function loginWithCredentialsFromLocalStorageIfThereAre() {
            authenticationService.loginWithCredentialsFromLocalStorageIfThereAre();
        }

        function isNegativeOrUndefined(value) {
            return angular.isUndefined(value) || value < 0;
        }

        function isZero(value) {
            return value === 0;
        }

        function isAnyPedidoItemUndefinedOrNegative() {
            return Object.values($scope.pedido).some(isNegativeOrUndefined);
        }

        function areAllPedidoItemsZero() {
            return Object.values($scope.pedido).every(isZero);
        }

        function isPedidoInvalid() {
            return angular.equals($scope.pedido, {}) || isAnyPedidoItemUndefinedOrNegative() || areAllPedidoItemsZero();
        }

        function cleanPedido() {
            angular.forEach($scope.pedido, function (val, key) {
                if (val <= 0) {
                    delete $scope.pedido[key];
                }
            });
        }

        function next() {
            cleanPedido();
            $sessionStorage.pedidoStep1 = $scope.pedido;
            if (isPedidoInvalid()) {
                $route.reload();
            } else {
                $sessionStorage.catalogo = $scope.catalogo;
                $location.path("/pedidos/detalles");
            }
        }

        function initialize() {
            $scope.catalogo = {};
            $scope.pedido = {};
            $scope.mode = "edit";
        }

        loginWithCredentialsFromLocalStorageIfThereAre();
        $scope.openEntrarDialog = openEntrarDialog;
        $scope.getEntrarButtonText = getEntrarButtonText;
        $scope.isAuthenticated = authenticationService.isAuthenticated;
        $scope.isAdmin = authenticationService.isAdmin;
        $scope.logout = logout;
        $scope.isZeroOrLess = isNegativeOrUndefined;
        $scope.isPedidoInvalid = isPedidoInvalid;
        $scope.next = next;
        initialize();
    });

