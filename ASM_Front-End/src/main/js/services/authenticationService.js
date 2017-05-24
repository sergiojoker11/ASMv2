'use strict';
angular.module('asm.authenticationService', [])
        .factory('authenticationService', function ($http, $log) {

            function login(username, password) {
                $log.debug(username + "-" + password);
                return $http.get('http://localhost:8084/ASM_Back-End/users/' + 1);
            }

            return {
                login: login
            };
        });


