(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService'])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			'ProductService',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log, ProductService) {
		$log.log('catalog ctrl');
		$scope.init = function(){
			$scope.catalogItems = [];
			$scope.getProductList()
		};

		$scope.getProductList = function () {
			ProductService.getList({order: $scope.order, skip: $scope.catalogItems.length, count: 9})
				.then(function (data) {
					// Success
					if (data.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						Array.prototype.push.apply($scope.catalogItems, data);
					}
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};

		$scope.init();
	}

})();
