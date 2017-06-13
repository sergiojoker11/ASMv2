'use strict';

angular.module('asm.genero', [])
        .directive("genero", function () {
            return {
                restrict: "E",
                templateUrl: 'admin/genero.html',
                replace: true,
                scope: {
                    genero: '='
                },
                controller: function ($log, $scope, catalogoService, Notification) {

                    var selectedIndex;
                    var tableRowExpanded;
                    var expandedTableRowIndex;
//
                    function getProductos() {
                        catalogoService.getProductos($scope.genero._links.productosList.href).then(function (response) {
                            $log.debug("Producossss", response);
                            $scope.productos.list = response.data._embedded.productoes;
                        }, function () {
                            Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
                        });
                    }

                    function collapseExistingEditPanels() {
                        $scope.productoDataCollapse = $scope.productos.list.map(function () {
                            return false;
                        });
                        tableRowExpanded = false;
                        expandedTableRowIndex = "";
                    }

                    function collapseAllEditPanels() {
                        collapseExistingEditPanels();
                    }

                    function setupProductoForEditing(index) {
                        $scope.producto = angular.copy($scope.productos.list[index]);
                    }

//                    function saveGenero() {
//                        catalogoService.saveGenero($scope.genero).then(function (response) {
//                            $log.debug("Success genero", response);
//                            $scope.generos.list.push(response.data);
//                            Notification.success("El elemento se ha guardado correctamente");
//                            $scope.cancel();
//                        }, function (error) {
//                            $log.debug("error genero", error);
//                            Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
//                        });
//                    }
//
//                    function saveProducto() {
//                        catalogoService.saveProducto($scope.producto).then(function (response) {
//                            $log.debug("Success producto", response);
//                            $scope.generos.list.push(response.data);
//                            Notification.success("El elemento se ha guardado correctamente");
//                            $scope.cancel();
//                        }, function (error) {
//                            $log.debug("error producto", error);
//                            Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
//                        });
//                    }
//
//                    function isInvalidUserInput(element) {
//                        return angular.isDefined(element) && element.$invalid && !element.$pristine;
//                    }
//
                    function expandRow(index) {
                        expandedTableRowIndex = index;
                        tableRowExpanded = true;
                        $scope.productoDataCollapse[expandedTableRowIndex] = true;
                        setupProductoForEditing(index);
                    }
//
//                    $scope.expandNewGeneroPanel = function () {
//                        if (angular.isDefined($scope.genero)) {
//                            $scope.cancel();
//                        }
//                        collapseExistingEditPanels();
//                        $scope.isNewGeneroPanelCollapsed = false;
//                        selectedIndex = -1;
//                    };
//                    $scope.expandNewProductPanel = function () {
//                        if (angular.isDefined($scope.genero)) {
//                            $scope.cancel();
//                        }
//                        collapseExistingEditPanels();
//                        $scope.isNewProductoPanelCollapsed = false;
//                        selectedIndex = -1;
//                    };
//
                    $scope.selectTableRow = function (index) {

                        if (tableRowExpanded === true) {
                            if (expandedTableRowIndex === index) {
                                $scope.cancel();
                            } else {
                                $scope.productoDataCollapse[expandedTableRowIndex] = false;
                                $scope.cancel();
                                expandRow(index);
                            }
                        } else {
                            expandRow(index);
                        }
                        selectedIndex = index;
                    };
//
                    $scope.cancel = function () {
                        collapseAllEditPanels();
                        $scope.producto = {};
                    };

//                    $scope.genero = {};
                    $scope.producto = {};
                    $scope.productos = {list: []};
                    getProductos();
//                    collapseAllEditPanels();
//                    $scope.saveGenero = saveGenero;
//                    $scope.saveProducto = saveProducto;
//                    $scope.isInvalidUserInput = isInvalidUserInput;
                    $log.debug("Estamos dentro chvules", $scope);

                }
            };

        });