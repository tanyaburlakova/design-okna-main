(function () {
	'use strict';

	angular.module('cartDirective', ['cartCtrl'])
		.directive('cart', [
			cartDirective
		]);

	function cartDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/cart.html',
			controller: 'CartCtrl',
			scope: {},
			replace: true,
			link: cartLink
		};
	}

	function cartLink(scope, el, attr) {
		var $dropdown = el.find('.cart__dropdown');
		$dropdown.appendTo(angular.element('header.site-header'));
		// $dropdown.find('.cart__list-holder').baron();
	}
})();
