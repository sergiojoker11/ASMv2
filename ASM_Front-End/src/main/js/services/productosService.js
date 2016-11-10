'use strict';

var productosService = angular.module('asm.productosService', []);

productosService.factory('productosService', function ($log, $http) {

    var productosFactory = {};

    productosFactory.insertar = function (producto) {
        return $http.post("localhost:8084/ASM_Back-End/", producto);
    };

    return productosFactory;

});