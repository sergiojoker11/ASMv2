'use strict';

angular.module('asm.productosService', [])
    .factory('productosService', function ($http, paths) {

        function insertar(producto) {
            return $http.post(paths.frontToBackEnd + "productoes", producto);
        }

        function get(id) {
            return $http.get(paths.frontToBackEnd + "productoes/" + id);
        }

        return {
            insertar: insertar,
            get: get
        };
    });