'use strict';

angular.module('asm.miPerfilController', [])
    .controller('miPerfilController', function ($scope, $log, userService, $rootScope, Notification, authenticationService, $location) {

        function getPerfil() {
            userService.getMiPerfil($rootScope.user).then(function (response) {
                $scope.user = response.data.user;
            }, function (error) {
                $log.debug("Error obteniendo la informacion del user", error);
                Notification.error("No hemos podido obtener su perfil. Si el error persiste, póngase en contacto con el administrador");
            });
        }

        function updatePerfil() {
            userService.updatePerfil($scope.user).then(function (response) {
                authenticationService.login(response.data._embedded.user);
                Notification.success("Su perfil has sido actualizado");
                $location.path("/pedido");
            }, function (error) {
                $log.debug("Error actualizando la informacion del user", error);
                Notification.error("No hemos podido actualizar su perfil. Si el error persiste, póngase en contacto con el administrador");
            });
        }

        function initialize() {
            $scope.mode = "edit";
            getPerfil();
        }

        $scope.updatePerfil = updatePerfil;
        initialize();
    });