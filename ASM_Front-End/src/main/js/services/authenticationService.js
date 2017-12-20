'use strict';
angular.module('asm.authenticationService', [])
        .factory('authenticationService', function ($http, $rootScope, Notification, $localStorage) {

            function authenticate(credentials) {
                return $http.post('http://localhost:8084/ASM_Back-End/login', credentials);
            }
            
            function login(user) {
                $rootScope.user = {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "admin": user.admin
                    };
                $localStorage.user = $rootScope.user;
                Notification.success('Bienvenido '+$rootScope.user.username+ ' !');
            }
            
            function loginWithCredentialsFromLocalStorageIfThereAre() {
                if (isAuthenticated()) {
                    $rootScope.user = $localStorage.user;
                }
            }
            
            function logout() {
                $rootScope.user = undefined;
                $localStorage.user = undefined;
            }
            
            function isAuthenticated() {
                return angular.isDefined($localStorage.user);
            }

            function getUserDetails() {
                if (isAuthenticated()) {
                    return $localStorage.user;
                }
                return {};
            }
            
            function isAdmin() {
                return angular.isDefined($rootScope.user) && $rootScope.user.admin;
            }

            return {
                authenticate: authenticate,
                login: login,
                loginWithCredentialsFromLocalStorageIfThereAre: loginWithCredentialsFromLocalStorageIfThereAre,
                isAuthenticated: isAuthenticated,
                getUserDetails: getUserDetails,
                isAdmin: isAdmin,
                logout: logout
            };
        });


