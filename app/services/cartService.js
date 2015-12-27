(function () {
	'use strict';
	angular.module('cartService', []).
	factory('CartService', [
		'$rootScope',
		cartService
	]);

	function cartService($rootScope) {
		var products = [];
		var service = {
			addProduct: addProduct,
			removeProduct: removeProduct,
			getProducts: getProducts
		};
		return service;

		function addProduct(product) {
			var prod = product || {
				image: 'img/product.jpg',
				title: 'Жалюзи Рулонные Facette',
				price: 1700
			};
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
