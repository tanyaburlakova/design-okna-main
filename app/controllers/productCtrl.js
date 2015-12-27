(function () {
	'use strict';
	angular.module('productCtrl', ['cartService'])
		.controller('ProductCtrl', [
			'$scope',
			'$log',
			'CartService',
			productCtrl
		]);

	function productCtrl($scope, $log, CartService) {
		$log.log('product ctrl');

		$scope.addProductToCart = function(product){
			CartService.addProduct(product);
		};
	}

})();
