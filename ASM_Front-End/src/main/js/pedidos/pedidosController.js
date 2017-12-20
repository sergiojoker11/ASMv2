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

        function getGeneros() {
            catalogoService.getGeneros().then(function (response) {
                $scope.generos.list = response.data._embedded.generoes;
            }, function () {
                Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
            });
        }

        function getProductosByGenero(link) {
            catalogoService.getProductos(link).then(function (response) {
                $scope.productos.list = response.data._embedded.productoes;
            }, function () {
                Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
            });
        }

        function initializePedidoByFormatos(formatosList) {
            angular.forEach(formatosList, function (formato) {
                if (angular.isUndefined($scope.pedido[formato.id])) {
                    $scope.pedido[formato.id] = 0;
                }
            });
        }

        function addOne(formatoId) {
            $scope.pedido[formatoId]++;
        }

        function substractOne(formatoId) {
            $scope.pedido[formatoId]--;
        }

        function isZeroOrLess(value) {
            return value === 0;
        }

        function cleanPedido() {
            angular.forEach($scope.pedido, function (val, key) {
                if (val <= 0) {
                    delete $scope.pedido[key];
                }
            });
        }

        function areAllPedidoItemsZero() {
            return Object.keys($scope.pedido).every(function (k) {
                return isZeroOrLess($scope.pedido[k]);
            });
        }

        function isPedidoInvalid() {
            return angular.equals($scope.pedido, {}) || areAllPedidoItemsZero();
        }

        function next() {
            cleanPedido();
            $sessionStorage.pedido = $scope.pedido;
            if (isPedidoInvalid()) {
                $route.reload();
            } else {
                $location.path("/pedidos/detalles");
            }
        }

        function initialize() {
            getGeneros();
            $scope.generos = {list: []};
            $scope.productos = {list: []};
            if (angular.isDefined($sessionStorage.pedido)) {
                $scope.pedido = $sessionStorage.pedido;
            } else {
                $scope.pedido = {};
            }
        }

        loginWithCredentialsFromLocalStorageIfThereAre();
        $scope.openEntrarDialog = openEntrarDialog;
        $scope.getEntrarButtonText = getEntrarButtonText;
        $scope.isAuthenticated = authenticationService.isAuthenticated;
        $scope.isAdmin = authenticationService.isAdmin;
        $scope.logout = logout;
        $scope.getProductosByGenero = getProductosByGenero;
        $scope.addOne = addOne;
        $scope.substractOne = substractOne;
        $scope.isZeroOrLess = isZeroOrLess;
        $scope.isPedidoInvalid = isPedidoInvalid;
        $scope.initializePedidoByFormatos = initializePedidoByFormatos;
        $scope.next = next;
        initialize();
    });

