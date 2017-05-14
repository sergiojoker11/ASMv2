'use strict';

angular.module('asm.panelControlController', [])
        .controller('panelControlController', function ($scope, $log, productosService) {
    
    $scope.producto1={};
    
    $scope.insertarProducto = function () {
        $scope.producto1.listaFormatos=[];
        $scope.producto1.listaFormatos.push($scope.formato1);
        $scope.producto1.listaFormatos.push($scope.formato2);
        $log.debug($scope.producto1);
        productosService.insertar($scope.producto1).then(function (response) {
            $log.debug("productosService.insertar() - response", response);
        }, function (error) {
            $log.debug("productosService.insertar() - response", error);
        });
        $log.debug("hemnos llamado a pintar", $scope);
    };
    
    $scope.getProducto = function () {
        productosService.get($scope.seleccion).then(function (response) {
            $log.debug("productosService.insertar() - response", response);
        }, function (error) {
            $log.debug("productosService.insertar() - response", error);
        });
    };

});


