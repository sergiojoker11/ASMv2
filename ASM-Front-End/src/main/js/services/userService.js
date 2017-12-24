'use strict';
angular.module('asm.userService', [])
        .factory('userService', function ($http, paths) {
            
            function register(user) {
                return $http.post(paths.frontToBackEnd + 'users',  user);
            }
            
            function remindPassword(email) {
                return $http.post(paths.frontToBackEnd + 'remindPassword',  email);
            }

            function getMiPerfil(user) {
                return $http.get(paths.frontToBackEnd + 'users/'+ user.id);
            }

            function updatePerfil(user) {
                return $http.put(paths.frontToBackEnd + 'users/'+ user.id, user);
            }
            
            return {
                register: register,
                remindPassword: remindPassword,
                getMiPerfil: getMiPerfil,
                updatePerfil: updatePerfil
            };
        });
