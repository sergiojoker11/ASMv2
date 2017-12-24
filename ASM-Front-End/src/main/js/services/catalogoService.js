'use strict';
angular.module('asm.catalogoService', ['ngFileUpload'])
        .factory('catalogoService', function ($http, Upload, paths) {
            
            function getGeneros() {
                return $http.get(paths.frontToBackEnd + 'generoes');
            }
            
            function getProductos(url) {
                return $http.get(url);
            }
            
            function getImageProducto(producto) {
                return $http.get(paths.frontToBackEnd + 'productoes/'+producto.id+'/image', {responseType: 'arraybuffer'});
            }
            
            function saveGenero(genero) {
                return $http.post(paths.frontToBackEnd + 'generoes', genero);
            }
            
            function updateGenero(genero) {
                return $http.put(paths.frontToBackEnd + 'generoes/'+ genero.id, genero);
            }
            
            function updateProductoMetadata(producto) {
                return $http.put(paths.frontToBackEnd + 'productoes/'+ producto.id, producto);
            }

            function updateProductoImage(producto) {
                return Upload.upload({
                    url: paths.frontToBackEnd + 'productoes/'+ producto.id +'/image',
                    data: {
                        image: producto.image
                    }
                });
            }
            
            function saveProducto(producto) {
                return $http.post(paths.frontToBackEnd + 'productoes', producto);
            }
            
            function deleteGenero(genero) {
                return $http.delete(paths.frontToBackEnd + 'generoes/'+ genero.id);
            }
            
            function deleteProducto(producto) {
                return $http.delete(paths.frontToBackEnd + 'productoes/'+ producto.id);
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
