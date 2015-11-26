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
	}

})();
