'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'asm.inicioController',
  'asm.productosController',
  'asm.pedidosController',
  'asm.panelControlController',
  'asm.accionesMenuController',
  'asm.productosService'
]);

app.config(function($locationProvider, $routeProvider) {
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