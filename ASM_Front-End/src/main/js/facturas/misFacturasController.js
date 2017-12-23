'use strict';

angular.module('asm.misFacturasController', [])
    .controller('misFacturasController', function ($scope, $log, facturasService, authenticationService) {

        function getFacturas() {
            facturasService.getFacturasByUser(authenticationService.getUserDetails()).then(function (response) {
                $scope.facturas = response.data._embedded.facturas;
            }, function (error) {
                $log.debug("Error obteniendo las facturas", error);
                Notification.error("No hemos podido obtener sus facturas. Si el error persiste, póngase en contacto con el administrador");
            });
        }

        function initialize() {
            $scope.facturas = {};
            getFacturas();
        }

        initialize();
    });

