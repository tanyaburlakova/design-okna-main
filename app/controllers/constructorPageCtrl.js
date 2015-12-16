(function () {
	'use strict';
	angular.module('constructorPageCtrl', [])
		.controller('ConstructorPageCtrl', [
			'$scope',
			'$log',
			'TexturesService',
			constructorPageCtrl
		]);

	function constructorPageCtrl($scope, $log, TexturesService) {
		$log.log('Constructor page ctrl');

		$scope.textureModel = null;

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};

		$scope.init = function () {
			$scope.getTextures();
		};

		$scope.getTextures = function () {
			TexturesService.getTextures()
				.then(function (data) {
					$scope.textures = data;
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.init();

	}

})();
