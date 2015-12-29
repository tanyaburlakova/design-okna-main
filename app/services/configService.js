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
			productSeeAlsoListPath: 'productList.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			catalogPath: 'catalog.json',
			constructorTexturesPath: 'constructor-textures.json',
			texturesPath: 'textures.json',
			reviewsPath: 'reviews.json',
			minPrice: 0,
			maxPrice: 2000
		}, window.appLicationConfig);
		return config;
	}
})();
