'use strict';
angular.module('asm.catalogoService', [])
        .factory('catalogoService', function ($http) {
            
            function getGeneros() {
                return $http.get('http://localhost:8084/ASM_Back-End/generoes/');
            }
            
            function saveGenero(genero) {
                return $http.post('http://localhost:8084/ASM_Back-End/generoes/', genero);
            }
            
            function saveProducto(producto) {
                return $http.post('http://localhost:8084/ASM_Back-End/productoes/', producto);
            }
            
            return {
                getGeneros: getGeneros,
                saveGenero: saveGenero,
                saveProducto: saveProducto
            };
        });
