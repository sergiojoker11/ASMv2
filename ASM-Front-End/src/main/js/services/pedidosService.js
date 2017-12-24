'use strict';
angular.module('asm.pedidosService', [])
    .factory('pedidosService', function ($http, paths) {

        function checkout(pedido) {
            return $http.post(paths.frontToBackEnd + 'pedidos', pedido);
        }

        return {
            checkout: checkout
        };
    });