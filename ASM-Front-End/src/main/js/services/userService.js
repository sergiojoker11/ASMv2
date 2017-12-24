'use strict';
angular.module('asm.userService', [])
        .factory('userService', function ($http) {
            
            function register(user) {
                return $http.post('http://localhost:8084/ASM_Back-End/users/',  user);
            }
            
            function remindPassword(email) {
                return $http.post('http://localhost:8084/ASM_Back-End/remindPassword/',  email);
            }

            function getMiPerfil(user) {
                return $http.get('http://localhost:8084/ASM_Back-End/users/'+ user.id);
            }

            function updatePerfil(user) {
                return $http.put('http://localhost:8084/ASM_Back-End/users/'+ user.id, user);
            }
            
            return {
                register: register,
                remindPassword: remindPassword,
                getMiPerfil: getMiPerfil,
                updatePerfil: updatePerfil
            };
        });
