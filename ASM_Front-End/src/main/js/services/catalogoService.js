'use strict';
angular.module('asm.catalogoService', [])
        .factory('catalogoService', function ($http) {
            
            function getGeneros() {
                return $http.get('http://localhost:8084/ASM_Back-End/generoes/');
            }
            
            function getProductos(url) {
                return $http.get(url);
            }
            
            function saveGenero(genero) {
                return $http.post('http://localhost:8084/ASM_Back-End/generoes/', genero);
            }
            
            function updateGenero(genero) {
                return $http.post('http://localhost:8084/ASM_Back-End/generoes/updateGenero', genero);
            }
            
            function saveProducto(producto) {
                return $http.post('http://localhost:8084/ASM_Back-End/productoes/', producto);
            }
            
            function deleteGenero(genero) {
                return $http.delete('http://localhost:8084/ASM_Back-End/generoes/'+ genero.id);
            }
            
            function deleteProducto(producto) {
                return $http.delete('http://localhost:8084/ASM_Back-End/productoes/'+ producto.id);
            }
            
            return {
                getGeneros: getGeneros,
                getProductos: getProductos,
                saveGenero: saveGenero,
                saveProducto: saveProducto,
                updateGenero: updateGenero,
                deleteGenero: deleteGenero,
                deleteProducto: deleteProducto
            };
        });
