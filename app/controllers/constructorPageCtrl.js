(function () {
	'use strict';
	angular.module('constructorPageCtrl', ['naif.base64', 'menuService', 'texturesService'])
		.controller('ConstructorPageCtrl', [
			'$scope',
			'$log',
			'$timeout',
			'TexturesService',
			'MenuService',
			constructorPageCtrl
		]);

	function constructorPageCtrl($scope, $log, $timeout, TexturesService, MenuService) {
		$log.log('Constructor page ctrl');

		$scope.textureModel = null;
		$scope.textureId = 1;

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};

		var menu = {};
		$scope.init = function () {
			$scope.currentTab = 'zhalyuzi';
			$scope.typesModel = {};
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
					label: item.title
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
			console.log($scope.typesModel);
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
						$scope.texture = TexturesService.getTextureById(newVal.toString());
					});
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.addToCart = function(){
			$scope.product.texture = $scope.texture.model;
			CartService.addProduct($scope.product);
		};

		$scope.init();

	}

})();
