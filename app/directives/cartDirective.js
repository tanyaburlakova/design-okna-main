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
		baron({
			root: '.baron',
			scroller: '.baron__scroller',
			bar: '.baron__bar',
			scrollingCls: '_scrolling',
			draggingCls: '_dragging'
		}).controls({
			track: '.baron__track'
		});
	}
})();
