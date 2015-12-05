(function () {
	'use strict';
	angular.module('productPageCtrl', [])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			'youtubeEmbedUtils',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log, youtubeEmbedUtils) {
		$log.log('product page ctrl');

		$scope.catalogItems = [1, 2, 3, 4];
		$scope.reviewsItems = [1, 2];
		$scope.gallery = {};
		$scope.gallery.currentImage = 'img/slide-1.jpg';

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};

	}

})();
