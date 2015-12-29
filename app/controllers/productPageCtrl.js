(function () {
	'use strict';
	angular.module('productPageCtrl', ['texturesService', 'productService', 'cartService', 'configService', 'reviewsDirective'])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			'youtubeEmbedUtils',
			'$location',
			'$routeParams',
			'TexturesService',
			'ProductService',
			'CartService',
			'ConfigService',
			'$sce',
			'$timeout',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log, youtubeEmbedUtils, $location, $routeParams, TexturesService, ProductService, CartService, ConfigService, $sce, $timeout) {
		$log.log('product page ctrl');

		$scope.init = function () {
			$scope.catalogItems = [];
			$scope.gallery = {};
			$scope.gallery.currentImage = '';
			$scope.textureModel = null;
			$scope.priceSlider = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
				options: {
					floor: ConfigService.minPrice,
					ceil: ConfigService.maxPrice
				}
			};
			$scope.getProduct();
			$scope.getTextures();
			$scope.getProducts();
		};

		$scope.getProduct = function () {
			ProductService.getProduct({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				slug: $routeParams.product
			}).then(function (data) {
				// Success
				$scope.product = data;
				$scope.product.cornice.text = $sce.trustAsHtml(data.cornice.text);
			}, function (err) {
				// Error
				console.log(err);
			});
		};

		$scope.addToCart = function(){
			CartService.addProduct($scope.product);
		};

		$scope.getTextures = function () {
			TexturesService.getTextures({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				slug: $routeParams.product
			}).then(function (data) {
				// Success
				var category = $routeParams.category,
					subcategory = $routeParams.subcategory,
					product = $routeParams.product,
					texture = $routeParams.texture,
					currentTexture = TexturesService.getTextureByUrl(texture) || {
						id: 1
					},
					currentId = currentTexture.id;

				$scope.textures = data;
				TexturesService.getTextureByUrl(texture);
				$scope.textureModel = currentId;

				$scope.$watch('textureModel', function (newVal, oldVal) {
					if (newVal) {
						$scope.getTextureById(newVal);
						$location.path('product/' + category + '/' + subcategory + '/' + product + '/' + $scope.currentTexture.url, false);
						$scope.gallery.currentImage = $scope.currentTexture.img;
					}
				});
			}, function (err) {
				// Error
				console.log(err);
			});
		};

		$scope.getProducts = function(){
			ProductService.getSeeAlsoList({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				slug: $routeParams.product
			}).then(function(data){
				$scope.catalogItems = data.splice(4, data.length);
			}, function(err){
				console.log(err);
			});
		};

		$scope.getTextureById = function (id) {
			$scope.currentTexture = TexturesService.getTextureById(id);
		};

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};

		$scope.init();
	}

})();
