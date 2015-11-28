(function () {
	'use strict';
	angular.module('catalogCtrl', [])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log) {
		$log.log('catalog ctrl');

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};
	}

})();
