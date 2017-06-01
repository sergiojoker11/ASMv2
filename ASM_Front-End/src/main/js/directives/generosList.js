'use strict';

angular.module('asm.generosList', [])
        .directive("generosList", function () {
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
                        $log.debug("Cataaaaaaalogo", $scope);
                    }

                    function collapseExistingGeneroEditPanels() {
                        $scope.generoDataCollapse = $scope.generos.list.map(function () {
                            return false;
                        });
                        tableRowExpanded = false;
                        expandedTableRowIndex = "";
                    }

                    function addNewGeneroToScope() {
                        $scope.userGroup = {};
                    }
                    
                    function addNewProductoToScope() {
                        $scope.userGroup = {};
                    }

                    function collapseAllGeneroEditPanels() {
                        collapseExistingGeneroEditPanels();
                        $scope.isNewGeneroPanelCollapsed = true;
                        $scope.isNewProductoPanelCollapsed = true;
                    }

                    function setupGeneroForEditing(index) {
                        $scope.genero = angular.copy($scope.generos.list[index]);
                    }

                    $scope.expandNewGeneroPanel = function () {
                        if (angular.isDefined($scope.genero)) {
                            $scope.cancel();
                        }
                        collapseExistingGeneroEditPanels();
                        addNewGeneroToScope();
                        $scope.isNewGeneroPanelCollapsed = false;
                        selectedIndex = -1;
                    };
                    $scope.expandNewProductPanel = function () {
                        if (angular.isDefined($scope.genero)) {
                            $scope.cancel();
                        }
                        collapseExistingGeneroEditPanels();
                        addNewProductoToScope();
                        $scope.isNewProductoPanelCollapsed = false;
                        selectedIndex = -1;
                    };

                    $scope.selectTableRow = function (index) {

                        $scope.isNewGeneroPanelCollapsed = true;
                        if (tableRowExpanded === true) {
                            if (expandedTableRowIndex === index) {
                                $scope.cancel();
                            } else {
                                $scope.generoDataCollapse[expandedTableRowIndex] = false;
                                $scope.cancel();
                                expandedTableRowIndex = index;
                                tableRowExpanded = true;
                                $scope.generoDataCollapse[expandedTableRowIndex] = true;
                                setupGeneroForEditing(index);
                            }
                        } else {
                            tableRowExpanded = true;
                            expandedTableRowIndex = index;
                            $scope.generoDataCollapse[index] = true;
                            setupGeneroForEditing(index);
                        }
                        selectedIndex = index;
                    };

                    $scope.cancel = function () {
                        collapseAllGeneroEditPanels();
                        $scope.genero = {};
                        $scope.newGeneroForm.$setPristine();
                    };

                    $scope.genero = {};
                    $scope.generos = {list: []};
                    getGeneros();
                    collapseAllGeneroEditPanels();

                }
            };

        });