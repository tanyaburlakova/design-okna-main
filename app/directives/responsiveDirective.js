(function () {
	'use strict';

	angular.module('responsiveDirective', [])
		.directive('responsive', [
			responsiveDirective
		]);

	function responsiveDirective() {
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			link: responsiveDirectiveLink
		};
	}

	function responsiveDirectiveLink(scope, el, attr) {
		
	}
})();
