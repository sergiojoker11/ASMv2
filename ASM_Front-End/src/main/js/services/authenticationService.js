'use strict';
angular.module('asm.authenticationService', [])
        .factory('authenticationService', function ($http, $log) {

            function login(credentials) {
                return $http.post('http://localhost:8084/ASM_Back-End/login', credentials);
            }

            return {
                login: login
            };
        });


