'use strict';

angular.module('asm.catalogo', [])
        .directive("catalogo", function () {
            return {
                restrict: "E",
                templateUrl: 'admin/catalogo.html',
                replace: true,
                controller: function ($log, $scope, catalogoService, Notification) {

                    var selectedIndex;
                    var tableRowExpanded;
                    var expandedTableRowIndex;

                    function getGeneros() {
                        catalogoService.getGeneros().then(function (response) {
                            $scope.generos.list = response.data._embedded.generoes;
                        }, function () {
                            Notification.error('Hubo un error cuando intentabamos mostrar el catalogo. Si el error persiste, póngase en contacto con el administrador');
                        });
                    }

                    function collapseExistingEditPanels() {
                        $scope.generoDataCollapse = $scope.generos.list.map(function () {
                            return false;
                        });
                        tableRowExpanded = false;
                        expandedTableRowIndex = "";
                    }

                    function collapseAllEditPanels() {
                        collapseExistingEditPanels();
                        collapseNewPanels();
                    }

                    function collapseNewPanels() {
                        $scope.isNewGeneroPanelCollapsed = true;
                        $scope.isNewProductoPanelCollapsed = true;
                    }

                    function setupGeneroForEditing(index) {
                        $scope.genero = angular.copy($scope.generos.list[index]);
                    }

                    function saveGenero() {
                        catalogoService.saveGenero($scope.genero).then(function (response) {
                            $log.debug("Success genero", response);
                            $scope.generos.list.push(response.data);
                            Notification.success("El elemento se ha guardado correctamente");
                            $scope.cancel();
                        }, function (error) {
                            $log.debug("error genero", error);
                            Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
                        });
                    }

                    function saveProducto() {
                        catalogoService.saveProducto($scope.producto).then(function (response) {
                            $log.debug("Success producto", response);
                            $scope.generos.list.push(response.data);
                            Notification.success("El elemento se ha guardado correctamente");
                            $scope.cancel();
                        }, function (error) {
                            $log.debug("error producto", error);
                            Notification.error("No hemos podido guardar el elemento. Si el error persiste, póngase en contacto con el administrador");
                        });
                    }

                    function isInvalidUserInput(element) {
                        return angular.isDefined(element) && element.$invalid && !element.$pristine;
                    }

                    function expandRow(index) {
                        expandedTableRowIndex = index;
                        tableRowExpanded = true;
                        $scope.generoDataCollapse[expandedTableRowIndex] = true;
                        setupGeneroForEditing(index);
                    }

                    $scope.expandNewGeneroPanel = function () {
                        if (angular.isDefined($scope.genero)) {
                            $scope.cancel();
                        }
                        collapseExistingEditPanels();
                        $scope.isNewGeneroPanelCollapsed = false;
                        selectedIndex = -1;
                    };
                    $scope.expandNewProductPanel = function () {
                        if (angular.isDefined($scope.genero)) {
                            $scope.cancel();
                        }
                        collapseExistingEditPanels();
                        $scope.isNewProductoPanelCollapsed = false;
                        selectedIndex = -1;
                    };

                    $scope.selectTableRow = function (index) {

                        collapseNewPanels();
                        if (tableRowExpanded === true) {
                            if (expandedTableRowIndex === index) {
                                $scope.cancel();
                            } else {
                                $scope.generoDataCollapse[expandedTableRowIndex] = false;
                                $scope.cancel();
                                expandRow(index);
                            }
                        } else {
                            expandRow(index);
                        }
                        selectedIndex = index;
                    };

                    $scope.cancel = function () {
                        collapseAllEditPanels();
                        $scope.genero = {};
                        $scope.producto = {};
                    };

                    $scope.genero = {};
                    $scope.producto = {};
                    $scope.generos = {list: []};
                    getGeneros();
                    collapseAllEditPanels();
                    $scope.saveGenero = saveGenero;
                    $scope.saveProducto = saveProducto;
                    $scope.isInvalidUserInput = isInvalidUserInput;
                    $scope.print = function() {
                        $log.debug("Funca");
                    };

                }
            };

        });