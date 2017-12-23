'use strict';
angular.module('asm.pedidosService', [])
    .factory('pedidosService', function ($http) {

        function checkout(pedido) {
            return $http.post('http://localhost:8084/ASM_Back-End/pedidos/', pedido);
        }

        return {
            checkout: checkout
        };
    });