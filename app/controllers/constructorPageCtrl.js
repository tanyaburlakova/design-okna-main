(function () {
	'use strict';
	angular.module('constructorPageCtrl', ['naif.base64', 'menuService', 'texturesService', 'cartService'])
		.controller('ConstructorPageCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'$timeout',
			'TexturesService',
			'MenuService',
			'CartService',
			'ResponsiveService',
			constructorPageCtrl
		]);

	function constructorPageCtrl($rootScope, $scope, $log, $timeout, TexturesService, MenuService, CartService, ResponsiveService) {
		/*$log.log('Constructor page ctrl');*/

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};
		
		$scope.infoExpand = false;
		$scope.firstLoad = true;

		var menu = {};
		$scope.init = function () {
			$scope.currentTab = 'louvers';
			$scope.typesModel = {};
			$scope.textureModel = null;
			$scope.textureId = null;
			$scope.mobile = ResponsiveService.getState('mobileLandscape');
			MenuService.getMenu()
			.then(function(data){
				menu = data.items;
				$scope.prepareTypes(true);
				$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
			}, function(err){
				console.log(err);
			});
			$scope.$parent.constructorHeader = true;
		};

		$scope.prepareTypes = function(withModels) {
			/*$log.info('ConstructorPageCtrl.prepareTypes');*/
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
			/*$log.info('ConstructorPageCtrl.prepareModels');*/
			$scope.models = _.map(_.findLast(menu[$scope.currentTab], 'url', selected.url).children, function(item){
				return {
					url: item.url,
					value: item.url.replace('/catalog/',''),
					label: item.constructorTitle
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
							if ($scope.mobile && !$scope.firstLoad){
								$("html, body").animate({ scrollTop:0 }, {duration: 700});
								$scope.infoExpand = true;
								$scope.hideInfoExpand();
							}
							if ($scope.firstLoad){
								$scope.firstLoad = false;
							}
						}
					});
					$scope.textureId = $scope.textures[0].id;
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.hideInfoExpand = function(){
			_.delay(function(){
				$scope.$apply(function(){
					$scope.infoExpand = false;
				});
			}, 4000);
		};

		$scope.addToCart = function(){
			CartService.addProduct($scope.product);
		};

		$scope.$on('ResponsiveService.updateState', function(){
			$scope.$apply(function(){
				$scope.mobile = ResponsiveService.getState('mobileLandscape');
			});
		});

		$scope.init();

	}

})();
