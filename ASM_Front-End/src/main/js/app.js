'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ui.bootstrap',
    //Controllers
    'asm.inicioController',
    'asm.productosController',
    'asm.pedidosController',
    'asm.panelControlController',
    'asm.accionesMenuController',
    'asm.alertController',
    'asm.loginController',
    'asm.registerController',
    //Services
    'asm.productosService',
    'asm.userService',
    'asm.authenticationService',
    'asm.alertService',
    'asm.modalDialogService',
    //Directives
    'asm.widthSource'
]);

app.config(function ($locationProvider, $routeProvider) {
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
            .when('/pedidos', {
                templateUrl: 'pedidos/pedidos.html',
                controller: 'pedidosController'
            })
            .when('/panelControl', {
                templateUrl: 'panelControl/panelControl.html',
                controller: 'panelControlController'
            })
            .otherwise({redirectTo: '/'});
    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(true);
});