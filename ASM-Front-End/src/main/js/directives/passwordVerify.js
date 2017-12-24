'use strict';
angular.module('asm.passwordVerify', [])
        .directive("passwordVerify", function () {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=passwordVerify"
                },
                link: function (scope, element, attributes, ngModel) {
                    ngModel.$validators.passwordVerify = function (modelValue) {
                        return modelValue === scope.otherModelValue;
                    };
                    scope.$watch("otherModelValue", function () {
                        ngModel.$validate();
                    });
                }
            };
        });

