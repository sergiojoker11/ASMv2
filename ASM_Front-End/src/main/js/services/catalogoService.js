'use strict';
angular.module('asm.catalogoService', [])
        .factory('catalogoService', function ($http) {
            
            function getGeneros() {
                return $http.get('http://localhost:8084/ASM_Back-End/generoes/');
            }
            
            return {
                getGeneros: getGeneros
            };
        });
