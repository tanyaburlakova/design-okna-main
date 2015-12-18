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

		$scope.init = function () {
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
