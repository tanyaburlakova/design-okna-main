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
			$scope.$parent.constructorHeader = false;
			$scope.catalogItems = [];
			$scope.product = {};
			$scope.product.withCornice = false;
			$scope.product.priceExactly = false;
			$scope.texturePrice = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
			};
			$scope.textureColors = {};
			$scope.gallery = {};
			$scope.gallery.currentImage = '';
			$scope.textureModel = null;
			$scope.resetSlider();
			$scope.getProduct();
			$scope.getTextures();
			$scope.getProducts();
		};

		$scope.calcPrice = function(){
			var p = $scope.product;
			if ($scope.currentTexture){
				if (!!p.dimensions.width && !!p.dimensions.height){
					p.priceExactly = true;
					if (p.withCornice){
						p.price = ($scope.currentTexture.price * p.dimensions.width * p.dimensions.height + p.cornice.price * p.dimensions.width);
					} else {
						p.price = ($scope.currentTexture.price * p.dimensions.width * p.dimensions.height);
					}
				} else {
					p.priceExactly = false;
					p.price = $scope.currentTexture.price;
				}
			}
		};

		var updateTextures = function(list){
			// Success
			if (list.length > 0){
				var category = $routeParams.category,
						subcategory = $routeParams.subcategory,
						product = $routeParams.product,
						texture = $routeParams.texture,
						currentTexture = TexturesService.getTextureBySlug(texture) || {
							id: list[0].id
						},
						currentId = currentTexture.id;
				$scope.textures = list;
				$scope.textureModel = currentId;
				$scope.showAllTextures = false;

				$scope.$watch('textureModel', function (newVal) {
					console.log(newVal);
					if (newVal !== "-1") {
						$scope.getTextureById(newVal);
						$location.path('product/' + category + '/' + subcategory + '/' + product + '/' + $scope.currentTexture.slug, false);
						$scope.gallery.currentImage = $scope.currentTexture.img;
						$scope.calcPrice();
					}
				});
				$scope.$watch('product.withCornice', $scope.calcPrice);
			}
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
				$scope.product.dimensions = {};
				$scope.product.withCornice = false;
				$scope.product.priceExactly = false;
			}, function (err) {
				// Error
				console.log(err);
			});
		};

		$scope.addToCart = function(){
			$scope.product.texture = $scope.currentTexture.model;
			CartService.addProduct($scope.product);
		};

		$scope.getTextures = function () {
			TexturesService.getTextures({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				slug: $routeParams.product
			}).then(function (data) {
				updateTextures(data);
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
				$scope.catalogItems = data.slice(0, 4);
			}, function(err){
				console.log(err);
			});
		};

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};


		// Textures
		$scope.getTextureById = function (id) {
			$scope.currentTexture = TexturesService.getTextureById(id);
		};

		$scope.filterTextures = function(){
			var colors = $scope.textureColors2;
			var price_min = $scope.texturePrice.min
			var price_max = $scope.texturePrice.max
			var textures = TexturesService.filterTextures(function(item){
				return (item.price <= price_max) &&
					(item.price >= price_min) &&
					((colors.length) ? _.include(colors, item.color) : true);
			});
			updateTextures(textures);
		};

		$scope.resetSlider = function(){
			$scope.priceSlider = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
				options: {
					floor: ConfigService.minPrice,
					ceil: ConfigService.maxPrice
				}
			};
			$scope.texturePrice.min = $scope.priceSlider.min;
			$scope.texturePrice.max = $scope.priceSlider.max;
			$scope.filterTextures();
		};

		$scope.$on('rangeDirective.updateRangeSlider', function(e){
			$scope.texturePrice.min = $scope.priceSlider.min;
			$scope.texturePrice.max = $scope.priceSlider.max;
			$scope.filterTextures();
		});

		$scope.$watchCollection('textureColors', function(){
			$scope.textureColors2 = _.reduce($scope.textureColors, function(result, n, key){
				if (n === true) result.push(key);
				return result;
			}, []);
			$scope.filterTextures();
		});

		$scope.init();
	}

})();
