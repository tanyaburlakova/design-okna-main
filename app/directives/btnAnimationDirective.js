(function() {
    'use strict';

    angular.module('btnAnimationDirective', [])
        .directive('btnAnimation', [
            btnAnimationDirective
        ]);

    function btnAnimationDirective() {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            link: btnAnimationDirectiveLink
        };
    }

    function btnAnimationDirectiveLink(scope, el, attr) {
        TweenMax.staggerFrom(element.children(), 1.5, {
            scale: 0.7,
            opacity: 0,
            delay: 0.5,
        }, 0.1);
    }
})();
