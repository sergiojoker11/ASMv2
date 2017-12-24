'use strict';
angular.module('asm.authenticationService', [])
    .factory('authenticationService', function ($http, $rootScope, $localStorage, paths) {

        function authenticate(credentials) {
            return $http.post(paths.frontToBackEnd + '/login', credentials);
        }

        function login(user) {
            delete user.password;
            $rootScope.user = user;
            $localStorage.user = $rootScope.user;
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


