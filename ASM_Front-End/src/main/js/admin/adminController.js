'use strict';

angular.module('asm.adminController', [])
        .controller('adminController', function ($scope) {
            
            $scope.isCatalogoCollapsed = true;
            
            function openCatalogoPanel() {
                $scope.isCatalogoCollapsed = !$scope.isCatalogoCollapsed;
            }

            $scope.openCatalogoPanel = openCatalogoPanel;
        });

