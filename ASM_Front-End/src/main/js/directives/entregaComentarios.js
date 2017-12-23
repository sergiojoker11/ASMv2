'use strict';

angular.module('asm.entregaComentarios', [])
    .directive("entregaComentarios", function () {
            return {
                restrict: "E",
                templateUrl: 'directives/entregaComentarios.html',
                scope: {
                    pedido: '=',
                    mode: '='
                },
                controller: function ($scope) {

                    function isReadonly() {
                        return $scope.mode === 'readonly';
                    }

                    function isEmptyString(string) {
                        return string.length === 0;
                    }

                    function isEmptyAndReadonly(string) {
                        return (angular.isUndefined(string) || isEmptyString(string)) && isReadonly();
                    }

                    function isInvalidUserInput(element) {
                        return angular.isDefined(element) && element.$invalid && !element.$pristine;
                    }

                    $scope.isReadonly = isReadonly;
                    $scope.isEmptyAndReadonly = isEmptyAndReadonly;
                    $scope.isInvalidUserInput = isInvalidUserInput;
                }
            };
        }
    );