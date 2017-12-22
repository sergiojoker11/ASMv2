'use strict';

angular.module('asm.userDetails', [])
    .directive("userDetails", function () {
            return {
                restrict: "E",
                templateUrl: 'directives/userDetails.html',
                scope: {
                    user: '=',
                    mode: '='
                },
                controller: function ($scope) {
                    function isEditMode() {
                        return $scope.mode === 'edit';
                    }

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

                    $scope.isEditMode = isEditMode;
                    $scope.isReadonly = isReadonly;
                    $scope.isEmptyAndReadonly = isEmptyAndReadonly;
                    $scope.isInvalidUserInput = isInvalidUserInput;
                }
            };
        }
    );