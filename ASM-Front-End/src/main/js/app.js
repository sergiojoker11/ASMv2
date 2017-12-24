'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    'ui-notification',
    'constants',
    //Controllers
    'asm.inicioController',
    'asm.productosController',
    'asm.pedidosController',
    'asm.panelControlController',
    'asm.accionesMenuController',
    'asm.loginController',
    'asm.registerController',
    'asm.remindPasswordController',
    'asm.adminController',
    'asm.editGeneroController',
    'asm.editProductoController',
    'asm.confirmationDialogController',
    'asm.detallesPedidoController',
    'asm.pedidoConfirmacionController',
    'asm.misFacturasController',
    'asm.miPerfilController',
    //Services
    'asm.productosService',
    'asm.userService',
    'asm.authenticationService',
    'asm.modalDialogService',
    'asm.catalogoService',
    'asm.pedidosService',
    'asm.facturasService',
    //Directives
    'asm.widthSource',
    'asm.passwordVerify',
    'asm.catalogo',
    'asm.genero',
    'asm.datepicker',
    'asm.catalogoPedido',
    'asm.entregaComentarios',
    'asm.userDetails',
    'asm.loginEntrarButton',
    'ngFileUpload',
    'ngStorage',
    'monospaced.elastic'
]);

app.config(function ($locationProvider, $routeProvider, NotificationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'inicio/inicio.html',
            controller: 'inicioController'
        })
        .when('/productos', {
            templateUrl: 'productos/productos.html',
            controller: 'productosController'
        })
        .when('/dondeEstamos', {
            templateUrl: 'dondeEstamos/dondeEstamos.html'
        })
        .when('/historiaAsm', {
            templateUrl: 'historiaAsm/historiaAsm.html'
        })
        .when('/historiaOlivo', {
            templateUrl: 'historiaOlivo/historiaOlivo.html'
        })
        .when('/contacto', {
            templateUrl: 'contacto/contacto.html'
        })
        .when('/panelControl', {
            templateUrl: 'panelControl/panelControl.html',
            controller: 'panelControlController'
        })
        .when('/pedidos', {
            templateUrl: 'pedidos/pedidos.html',
            controller: 'pedidosController'
        })
        .when('/pedidos/detalles', {
            templateUrl: 'pedidos/detallesPedido.html',
            controller: 'detallesPedidoController'
        })
        .when('/pedidos/detalles/confirmacion', {
            templateUrl: 'pedidos/pedidoConfirmacion.html',
            controller: 'pedidoConfirmacionController'
        })
        .when('/pedidos/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'adminController'
        })
        .when('/pedidos/facturas', {
            templateUrl: 'facturas/misFacturas.html',
            controller: 'misFacturasController'
        })
        .when('/pedidos/perfil', {
            templateUrl: 'miPerfil/miPerfil.html',
            controller: 'miPerfilController'
        })
        .otherwise({redirectTo: '/'});
    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(true);
    NotificationProvider.setOptions({
        delay: 8000,
        startTop: 10,
        startRight: 10,
        positionX: 'center',
        positionY: 'bottom'
    });
});