'use strict';
angular.module('asm.userService', [])
        .factory('userService', function ($http) {
            
            function register(user) {
                return $http.post('http://localhost:8084/ASM_Back-End/users/',  user);
            }
            
            function remindPassword(email) {
                return $http.post('http://localhost:8084/ASM_Back-End/remindPassword/',  email);
            }
            
            return {
                register: register,
                remindPassword: remindPassword
            };
        });
