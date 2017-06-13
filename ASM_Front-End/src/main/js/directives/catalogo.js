'use strict';

angular.module('asm.catalogo', [])
        .directive("catalogo", function () {
            return {
                restrict: "E",
                templateUrl: 'admin/catalogo.html',
                replace: true,
                controller: function ($log, $scope, catalogoService, Notification, modalDialogService) {

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

                    function openDialog(view, controller, scope, setPromise, successHandler) {
                        var partialCloseDialog = angular.bind(this, modalDialogService.closeDialog);
                        modalDialogService.openModalInstance(view, controller, scope, setPromise)
                                .then(successHandler, partialCloseDialog);
                    }

                    function openConfirmationModal(action, actionSuccessMessageKey) {
                        modalDialogService.openModalInstance('utils/confirmationDialogView.html', 'confirmationDialogController', $scope).then(function () {
                            action().then(function () {
                                getGeneros();
                                Notification.success(actionSuccessMessageKey);
                            }, function () {
                                Notification.error("No se ha podido eliminar el género. Si el error persiste, póngase en contacto con el administrador");
                            });
                        }, angular.noop);
                    }

                    function openEditGeneroModal(genero) {
                        var promise = {genero: genero};
                        openDialog('admin/editGenero.html', 'editGeneroController', $scope, promise, getGeneros);
                    }

                    function confirmDeletionModal() {
                        $scope.confirmationModalData = modalDialogService.setUpConfirmationModal("Eliminar Género", "¿Realmente desea eliminar este género junto con todos sus productos y formatos?");
                        var action = angular.bind(this, catalogoService.deleteGenero, $scope.genero);
                        openConfirmationModal(action, 'El género ha sido eliminado, así como sus productos y formatos');
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
                    $scope.openEditGeneroModal = openEditGeneroModal;
                    $scope.confirmDeletionModal = confirmDeletionModal;
                }
            };

        });