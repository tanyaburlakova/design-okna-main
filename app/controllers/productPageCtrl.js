(function () {
	'use strict';
	angular.module('productPageCtrl', [])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log) {
		$log.log('product page ctrl');

		$scope.catalogItems = [1, 2, 3, 4];

	}

})();
