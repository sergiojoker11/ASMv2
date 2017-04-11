'use strict';

angular.module('asm.widthSource', [])
        .directive( 'widthSource', function($window) {

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
});

