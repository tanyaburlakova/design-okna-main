(function () {
	'use strict';

	angular.module('rangeDirective', ['rzModule'])
		.directive('range', [
			rangeDirective
		]);

	function rangeDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/range.html',
			scope: {
				min: '=',
				max: '=',
				options: '='
			},
			replace: true,
			link: rangeDirectiveLink
		};
	}

	function rangeDirectiveLink(scope, el, attr) {
		scope.$watch('min', function (value) {
			console.log(value);
		});
	}
})();
