(function () {
	'use strict';
	angular.module('cartService', []).
	factory('CartService', [
		'$rootScope',
		'localStorageService',
		cartService
	]);

	function cartService($rootScope, localStorageService) {
		var products = [];
		var service = {
			addProduct: addProduct,
			removeProduct: removeProduct,
			getProducts: getProducts
		};
		return service;

		function addProduct(product) {
			products.push(prod);
		}

		function removeProduct(idx) {
			products.splice(idx, 1);
		}

		function getProducts(){
			return products;
		}
	}
})();
