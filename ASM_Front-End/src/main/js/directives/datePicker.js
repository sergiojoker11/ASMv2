'use strict';

angular.module('asm.datepicker', ['ui.bootstrap']).directive("datePicker", function () {
    return {
        restrict: "E",
        require: "ngModel",
        scope: {
            ngModel: '=',
            ngReadonly: '=?',
            ngDisabled: '=?',
            ngRequired: '=?',
            minDate: '=?',
            maxDate: '=?',
            dateOptions: '=?'
        },
        templateUrl: 'directives/datePicker.html',
        controller: function ($scope) {
            $scope.dateOptions = $scope.dateOptions || {
                startingDay: 1,
                maxDate: $scope.maxDate,
                minDate: $scope.minDate,
                ngRequired: $scope.ngRequired,
                showWeeks: false
            };

            $scope.openDatePicker = function ($event) {
                $event.stopPropagation();
                $scope.opened = true;
            };

            $scope.format = 'dd-MMMM-yyyy';
        }
    };
});