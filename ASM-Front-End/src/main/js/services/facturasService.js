'use strict';
angular.module('asm.facturasService', [])
    .factory('facturasService', function ($http, paths) {

        function getFacturasByUser(user) {
            return $http.get(paths.frontToBackEnd + 'facturas', user);
        }

        return {
            getFacturasByUser: getFacturasByUser
        };
    });