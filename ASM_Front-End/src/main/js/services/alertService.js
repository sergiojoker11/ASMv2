'use strict';

angular.module('asm.alertService', [])
        .factory('alertService', function ($log, $rootScope) {
            var alertsHolder = {};
            alertsHolder.alerts = [];

            function addAlert(type, msg, persistent) {
                if (type === 'error') {
                    type = 'danger';
                }
                if (angular.isNumber(persistent)) {
                    $log.debug("Raised persistent alert: ", type, msg, persistent);
                    alertsHolder.alerts.push({type: type, msg: msg, persistent: persistent});
                } else {
                    $log.debug("Raised alert: ", type, msg, 0);
                    alertsHolder.alerts.push({type: type, msg: msg, persistent: 0});
                }
            }

            function closeAlert(index) {
                $log.debug("closed alert ", index);
                alertsHolder.alerts.splice(index, 1);
            }

            function getAlertsHolder() {
                return alertsHolder;
            }

            function clearAlerts() {
                $log.debug("Clearing alerts");
                alertsHolder.alerts.length = 0;
            }

            function expireAlerts() {
                var oldAlerts = alertsHolder.alerts;
                alertsHolder.alerts = alertsHolder.alerts.filter(function (alert) {
                    return alert.persistent > 0;
                }).map(function (alert) {
                    alert.persistent -= 1;
                    return alert;
                });
                $log.debug("Expired alerts, was", oldAlerts, "is now", alertsHolder.alerts);
            }

            $rootScope.$on("$routeChangeStart", function () {
                expireAlerts();
            });

            return {
                addAlert: addAlert,
                closeAlert: closeAlert,
                clearAlerts: clearAlerts,
                expireAlerts: expireAlerts,
                getAlertsHolder: getAlertsHolder
            };
        });