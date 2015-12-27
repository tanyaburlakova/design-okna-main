(function () {
	'use strict';
	angular.module('configService', []).
	factory('ConfigService', [
		configService
	]);

	function configService() {
		var config = angular.extend({}, {
			homeSlider: 'sliderItems.json',
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productHomeListPath: 'productList.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			minPrice: 0,
			maxPrice: 2000
		}, window.appLicationConfig);
		return config;
	}
})();
