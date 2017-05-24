'use strict';
angular.module('asm.userService', [])
        .factory('userService', function ($http) {
            
            function register(user) {
                return $http.post('http://localhost:8084/ASM_Back-End/users/',  user);
            }
            
            return {
                register: register
            };
        });
