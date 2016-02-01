(function () {
	'use strict';
	angular.module('configService', []).
	factory('ConfigService', [
		configService
	]);

	function configService() {
		var config = angular.extend({}, {
			featuredProductPath: 'featuredProduct.json',
			productListPath: 'productList.json',
			productHomeListPath: 'productList.json',
			productSeeAlsoListPath: 'productList.json',
			productPagePath: 'product.json',
			questionPath: 'questions.json',
			articlePath: 'article.json',
			catalogPath: 'catalog.json',
			constructorTexturesPath: 'textures.json',
			texturesPath: 'textures.json',
			reviewsPath: 'reviews.json',
			newReviewPath: 'review-post-response.json',
			newsPath: 'news.json',
			searchPath: 'search.json',
			minPrice: 0,
			maxPrice: 4000,
			serverTime: '10 Jan 2016 20:10:00 GMT+0300',
			openHour: 9,
			closeHour: 21,
			orderPath: 'order.json',
			feedbackPath: 'order.json',
			structurePath: 'structure.json',
			homeArticleSlug: 'trends'
		}, window.appLicationConfig);
		return config;
	}
})();
