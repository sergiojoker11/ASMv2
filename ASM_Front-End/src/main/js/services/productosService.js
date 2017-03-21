'use strict';

var productosService = angular.module('asm.productosService', []);

productosService.factory('productosService', function ($http) {

    function insertar(producto) {
        return $http.post("http://localhost:8084/ASM_Back-End/productoes", producto);
    }
    
    function get(id) {
        return $http.get("http://localhost:8084/ASM_Back-End/productoes/"+id);
    }

    return {
        insertar: insertar,
        get: get
    };
});