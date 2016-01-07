(function () {
	'use strict';
	angular.module('constructorPageCtrl', ['naif.base64'])
		.controller('ConstructorPageCtrl', [
			'$scope',
			'$log',
			'$timeout',
			'TexturesService',
			constructorPageCtrl
		]);

	function constructorPageCtrl($scope, $log, $timeout, TexturesService) {
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

		$scope.types = [{
			id: '1',
			label: 'Горизонтальные'
		}, {
			id: '2',
			label: 'Вертикальные'
		}, {
			id: '3',
			label: 'Рулонные'
		}];

		$scope.models = [{
			id: '1',
			label: 'Лаура'
		}, {
			id: '2',
			label: 'Эльвира'
		}, {
			id: '3',
			label: 'Моисей'
		}];

		$scope.typesModel = $scope.types[0];
		$scope.modelsModel = $scope.models[0];

		$scope.init = function () {
			$scope.$parent.constructorHeader = true;
			$scope.getConstructorTextures();
		};

		$scope.getConstructorTextures = function () {
			TexturesService.getConstructorTextures()
				.then(function (data) {
					// Success
					$scope.textures = data;
					$scope.$watch('textureId', function (newVal) {
						$scope.texture = TexturesService.getTextureById(newVal);
					});
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.init();

	}

})();
