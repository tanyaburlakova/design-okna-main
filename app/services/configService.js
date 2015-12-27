(function () {
	'use strict';
	angular.module('configService', []).
	factory('ConfigService', [
		configService
	]);

	function configService() {
		var config = {
			homeSlider: 'sliderItems.json',
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productPagePath: 'product.json'
		};
		var configProd = {
			featuredProductPath: 'yourPath',
			productListPath: 'productList.json'
		};
		return config;
	}
})();
