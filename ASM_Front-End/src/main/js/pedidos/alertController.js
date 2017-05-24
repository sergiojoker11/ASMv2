'use strict';

angular.module('asm.alertController', [])
        .controller('alertController', function ($scope, alertService) {
            $scope.alertsHolder = alertService.getAlertsHolder();

            $scope.closeAlert = function (index) {
                alertService.closeAlert(index);
            };
        });

