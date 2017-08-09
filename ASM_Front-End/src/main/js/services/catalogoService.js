'use strict';
angular.module('asm.catalogoService', ['ngFileUpload'])
        .factory('catalogoService', function ($http, Upload) {
            
            function getGeneros() {
                return $http.get('http://localhost:8084/ASM_Back-End/generoes/');
            }
            
            function getProductos(url) {
                return $http.get(url);
            }
            
            function getImageProducto(producto) {
                return $http.get('http://localhost:8084/ASM_Back-End/productoes/'+producto.id+'/image', {responseType: 'arraybuffer'});
            }
            
            function saveGenero(genero) {
                return $http.post('http://localhost:8084/ASM_Back-End/generoes/', genero);
            }
            
            function updateGenero(genero) {
                return $http.post('http://localhost:8084/ASM_Back-End/generoes/updateGenero', genero);
            }
            
            function updateProducto(producto) {
                return Upload.upload({
                    url: 'http://localhost:8084/ASM_Back-End/productoes/updateProducto',
                    data: {
                        id: producto.id,
                        nombre: producto.nombre,
                        image: producto.image,
                        listaFormatos: producto.listaFormatos
                    }
                });
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
                getImageProducto: getImageProducto,
                saveGenero: saveGenero,
                saveProducto: saveProducto,
                updateGenero: updateGenero,
                updateProducto: updateProducto,
                deleteGenero: deleteGenero,
                deleteProducto: deleteProducto
            };
        });
