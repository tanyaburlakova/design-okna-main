(function () {
	'use strict';
	angular.module('productPageCtrl', [])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			'youtubeEmbedUtils',
			'$location',
			'$routeParams',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log, youtubeEmbedUtils, $location, $routeParams) {
		$log.log('product page ctrl');

		$scope.catalogItems = [1, 2, 3, 4];
		$scope.reviewsItems = [1, 2];
		$scope.gallery = {};
		$scope.gallery.currentImage = 'img/slide-1.jpg';
		$scope.textureModel = 1;

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};

		$scope.$watch('textureModel', function (newVal, oldVal) {
			var category = $routeParams.category,
				subcategory = $routeParams.subcategory,
				subsubcategory = $routeParams.subsubcategory,
				texture = $routeParams.texture;
			if (newVal) {
				$location.path('product/' + category + '/' + subcategory + '/' + subsubcategory + '/' + newVal, false);
			}
		});

		$scope.textures = [{
			id: 1,
			fill: 'red',
			name: 'blood-rain'
		}, {
			id: 2,
			fill: 'red',
			name: 'blood-rain'
		}, {
			id: 3,
			fill: 'blue',
			name: 'blue-rain'
		}, {
			id: 4,
			fill: 'red',
			name: 'blood-rain'
		}, {
			id: 5,
			fill: 'green',
			name: 'blood-green'
		}, {
			id: 6,
			fill: 'red',
			name: 'blood-rain'
		}, {
			id: 7,
			fill: 'grey',
			name: 'blood-grey'
		}, {
			id: 8,
			fill: 'brown',
			name: 'blood-brown'
		}, {
			id: 9,
			fill: 'beige',
			name: 'blood-beige'
		}, {
			id: 10,
			fill: 'darkgrey',
			name: 'blood-darkgrey'
		}, {
			id: 11,
			fill: 'red',
			name: 'blood-rain'
		}, {
			id: 12,
			fill: 'lightgreen',
			name: 'blood-lightgreen'
		}];

	}

})();
