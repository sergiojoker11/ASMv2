'use strict';

var widthSource = angular.module('asm.widthSource', []);

widthSource.directive( 'widthSource', ['$window', function($window) {

    return {
        link: function(scope, elem, attrs) {
            scope.width = $window.innerWidth;

            angular.element($window).bind('resize', function(){      
                scope.width = $window.innerWidth;
                scope.$digest();
                scope.$broadcast('widthChange');
            });
        }
    };
}]);

