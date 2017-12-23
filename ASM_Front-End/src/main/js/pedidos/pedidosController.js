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

        function applyPedidoToCatalogo(catalogo, pedido) {
            angular.forEach(pedido, function (val, key) {
                angular.forEach(catalogo, function (genero) {
                    angular.forEach(genero.productosList, function (producto) {
                        angular.forEach(producto.listaFormatos, function (formato) {
                            if (formato.id == key) {
                                formato.quantity = val;
                            }
                        });
                    });
                });
            });
        }

        function cleanCatalogoWithPedido(catalogo) {
            angular.forEach(catalogo, function (genero, generoIndex, generoList) {
                $log.debug("genero", genero);
                if (angular.isDefined(genero.productosList) && genero.productosList.length > 0) {
                    angular.forEach(genero.productosList, function (producto, productoIndex, productosList) {
                        $log.debug("producto", producto);
                        if (angular.isDefined(producto.listaFormatos) && producto.listaFormatos.length > 0) {
                            angular.forEach(producto.listaFormatos, function (formato, formatoIndex, listaFormatos) {
                                $log.debug("formato", formato);
                                if (angular.isUndefined(formato.quantity) || formato.quantity === null || isZero(formato.quantity)) {
                                    $log.debug("formato borrado", formato);
                                    listaFormatos.splice(formatoIndex, 1);
                                }
                            });
                        }
                        if (angular.isUndefined(producto.listaFormatos) || producto.listaFormatos.length === 0) {
                            $log.debug("producto borrado", producto);
                            productosList.splice(productoIndex, 1);
                        }
                    });
                }
                if (angular.isUndefined(genero.productosList) || genero.productosList.length === 0) {
                    $log.debug("genero borrado", genero);
                    generoList.splice(generoIndex, 1);
                }
            });
        }

        function deepCopy(obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        function mixCatalogoWithPedido(catalogo, pedido) {
            var catalogoOutput = deepCopy(catalogo);
            applyPedidoToCatalogo(catalogoOutput, pedido);
            $log.debug("catalogoOutput", catalogoOutput);
            cleanCatalogoWithPedido(catalogoOutput);
            return catalogoOutput;
        }

        function next() {
            cleanPedido();
            $sessionStorage.pedidoStep1 = $scope.pedido;
            if (isPedidoInvalid()) {
                $route.reload();
            } else {
                $log.debug("$scope.catalogo", $scope.catalogo);
                $sessionStorage.catalogo = mixCatalogoWithPedido($scope.catalogo, $scope.pedido);
                $log.debug("$scope.catalogo", $scope.catalogo);
                $log.debug("$sessionStorage.catalogo", $sessionStorage.catalogo);
                $location.path("/pedidos/detalles");
            }
        }

        function initialize() {
            $scope.catalogo = {};
            $scope.mode = "edit";
            if (angular.isDefined($sessionStorage.pedidoStep1)) {
                $scope.pedido = $sessionStorage.pedidoStep1;
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
        $scope.isZeroOrLess = isNegativeOrUndefined;
        $scope.isPedidoInvalid = isPedidoInvalid;
        $scope.next = next;
        initialize();
    });

