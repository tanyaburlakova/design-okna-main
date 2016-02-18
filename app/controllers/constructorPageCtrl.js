(function () {
	'use strict';
	angular.module('constructorPageCtrl', ['naif.base64', 'menuService', 'texturesService', 'configService',  'cartService'])
		.controller('ConstructorPageCtrl', [
			'$scope',
			'$log',
			'$timeout',
			'TexturesService',
			'MenuService',
			'ConfigService',
			'CartService',
			constructorPageCtrl
		]);

	function constructorPageCtrl($scope, $log, $timeout, TexturesService, MenuService, CartService, ConfigService) {
		$log.log('Constructor page ctrl');

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};
		
		$scope.infoExpand = false;

		var menu = {};
		$scope.init = function () {
			$scope.currentTab = 'louvers';
			$scope.typesModel = {};
			$scope.textureModel = null;
			$scope.textureId = null;
			$scope.texturePrice = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
			};
			$scope.textureColors = {};
			$scope.textureModel = null;
			MenuService.getMenu()
			.then(function(data){
				menu = data;
				$scope.prepareTypes(true);
			}, function(err){
				console.log(err);
			});
			$scope.$parent.constructorHeader = true;
		};

		$scope.prepareTypes = function(withModels) {
			$log.info('ConstructorPageCtrl.prepareTypes');
			$scope.types = _.map(menu[$scope.currentTab], function(item){
				return {
					url: item.url,
					value: item.url.replace('/catalog/',''),
					label: item.title,
					category: ($scope.currentTab === 'louvers') ? 'Жалюзи' : 'Шторы'
				};
			});
			$scope.typesModel = $scope.types[0];
			if (withModels) $scope.prepareModels($scope.typesModel);
		};

		$scope.prepareModels = function(selected) {
			$log.info('ConstructorPageCtrl.prepareModels');
			$scope.models = _.map(_.findLast(menu[$scope.currentTab], 'url', selected.url).children, function(item){
				return {
					url: item.url,
					value: item.url.replace('/catalog/',''),
					label: item.title
				};
			});
			if ($scope.models.length){
				$scope.modelsModel = $scope.models[0];
				$scope.getConstructorTextures($scope.modelsModel);
			} else {
				$scope.modelsModel = {};
				$scope.getConstructorTextures(false);
			}
		};

		$scope.getConstructorTextures = function (model) {
			var route = [];
			var category = '';
			var subcategory = '';
			if (model){
				route = /([A-z]+)\/([A-z]+)\/([A-z]+)/g.exec(model.url);
				category = route[2];
				subcategory = route[3];
			} else {
				route = /([A-z]+)\/([A-z]+)/g.exec($scope.typesModel.url);
				category = route[2];
				subcategory = null;
			}
			TexturesService.getConstructorTextures({
				category: category,
				subcategory: subcategory
			})
				.then(function (data) {
					// Success
					$scope.textures = data;
					$scope.$watch('textureId', function (newVal) {
						if (!!newVal){
							$scope.texture = TexturesService.getTextureById(newVal);
							$scope.product = {
								image: $scope.texture.product_image,
								title: $scope.texture.product_name,
								price: $scope.texture.price,
								texture: $scope.texture.model
							};
						}
					});
					$scope.textureId = $scope.textures[0].id;
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.addToCart = function(){
			CartService.addProduct($scope.product);
		};

		$scope.$watchCollection('textureColors', function(){
			$scope.textureColors2 = _.reduce($scope.textureColors, function(result, n, key){
				if (n === true) result.push(key);
				return result;
			}, []);
			console.log($scope.textureColors2);
			$scope.filterTextures();
		});

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
					$log.log(newVal);
					if (newVal !== "-1") {
						$scope.getTextureById(newVal);
						$location.path('product/' + category + '/' + subcategory + '/' + product + '/' + $scope.currentTexture.slug, false);
						$scope.gallery.previewImage = null;
						$scope.calcPrice();
					}
				});
				$scope.$watch('previewTextureModel', function (newVal) {
					if (newVal) {
						$scope.gallery.previewImage = TexturesService.getTextureById(newVal).img;
					} else {
						$scope.gallery.previewImage = null;
					}
				});
			}
		};

		$scope.filterTextures = function(){
			if ($scope.textures.length > 0){
				var colors = $scope.textureColors2;
				var price_min = $scope.texturePrice.min
				var price_max = $scope.texturePrice.max
				var textures = TexturesService.filterTextures(function(item){
					return (item.price <= price_max) &&
						(item.price >= price_min) &&
						((colors.length) ? _.include(colors, item.color) : true);
				});
				updateTextures(textures);
			}
		};

		$scope.$on('rangeDirective.updateRangeSlider', function(e){
			$scope.texturePrice.min = $scope.priceSlider.min;
			$scope.texturePrice.max = $scope.priceSlider.max;
			$scope.filterTextures();
		});

		$scope.$on('ResponsiveService.updateState', function(){
			$scope.$apply(function(){
				$scope.desktop = ResponsiveService.getState('desktop');
				$scope.mobile = ResponsiveService.getState('mobileLandscape');
				console.log($scope.mobile);
			});
		});

		$scope.clearTextureColor = function(){
			$scope.textureColors = {};
		};


		$scope.init();

	}

})();
