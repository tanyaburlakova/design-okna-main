(function () {
	'use strict';
	angular.module('cartService', []).
	factory('CartService', [
		'$rootScope',
		'localStorageService',
		cartService
	]);

	function cartService($rootScope, localStorageService) {
		var products = JSON.parse(localStorageService.get('cart_products')) || [];
		var service = {
			addProduct: addProduct,
			removeProduct: removeProduct,
			getProducts: getProducts
		};
		return service;

		function addProduct(product) {
			products.push(product);
			localStorageService.set('cart_products', JSON.stringify(products));
		}

		function removeProduct(idx) {
			products.splice(idx, 1);
			localStorageService.set('cart_products', JSON.stringify(products));
		}

		function getProducts(){
			return products;
		}
	}
})();
