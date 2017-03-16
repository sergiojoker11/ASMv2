'use strict';

var productosService = angular.module('asm.productosService', []);

productosService.factory('productosService', function ($http) {

    function insertar (producto) {
        return $http.post("http://localhost:8084/ASM_Back-End/productoes", producto);
    }

    return {
        insertar: insertar
    };
});