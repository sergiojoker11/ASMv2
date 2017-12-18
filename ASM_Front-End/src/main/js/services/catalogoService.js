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
                return $http.put('http://localhost:8084/ASM_Back-End/generoes/'+ genero.id, genero);
            }
            
            function updateProductoMetadata(producto) {
                return $http.put('http://localhost:8084/ASM_Back-End/productoes/'+ producto.id, producto);
            }

            function updateProductoImage(producto) {
                return Upload.upload({
                    url: 'http://localhost:8084/ASM_Back-End/productoes/'+ producto.id +'/image',
                    data: {
                        image: producto.image
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
                updateProductoMetadata: updateProductoMetadata,
                updateProductoImage: updateProductoImage,
                deleteGenero: deleteGenero,
                deleteProducto: deleteProducto
            };
        });
