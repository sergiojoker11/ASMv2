'use strict';
angular.module('asm.authenticationService', [])
        .factory('authenticationService', function ($http, $rootScope, Notification) {

            function authenticate(credentials) {
                return $http.post('http://localhost:8084/ASM_Back-End/login', credentials);
            }
            
            function login(user) {
                $rootScope.user = {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email
                    };
                Notification.success('Bienvenido '+$rootScope.user.username+ ' !');
            }
            
            function logout() {
                $rootScope.user = undefined;
            }
            
            function isAuthenticated() {
                return angular.isDefined($rootScope.user);
            }
            
            function sendEmail() {
                $http.get('http://localhost:8084/ASM_Back-End/correo');
            }

            return {
                authenticate: authenticate,
                login: login,
                isAuthenticated: isAuthenticated,
                logout: logout,
                sendEmail: sendEmail
            };
        });


