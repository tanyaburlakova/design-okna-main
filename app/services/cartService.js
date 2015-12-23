(function () {
	'use strict';
	angular.module('cartService', []).
	factory('CartService', [
		'API_PATH',
		'$http',
		'$q',
		cartService
	]);

	function cartService(API_PATH, $http, $q) {
		var service = {
			addProduct: addProduct
		};
		return service;

		function addProduct(product) {
			
		}
	}
})();
