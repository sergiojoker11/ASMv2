'use strict';
angular.module('asm.facturasService', [])
    .factory('facturasService', function ($http) {

        function getFacturasByUser(user) {
            return $http.get('http://localhost:8084/ASM_Back-End/facturas/', user);
        }

        return {
            getFacturasByUser: getFacturasByUser
        };
    });