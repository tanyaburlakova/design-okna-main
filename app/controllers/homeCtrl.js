(function () {
	'use strict';
	angular.module('homeCtrl', ['benefitsDirective', 'productService', 'productCtrl'])
		.controller('HomeCtrl', [
			'$scope',
			'$log',
			'ProductService',
			homeCtrl
		]);

	function homeCtrl($scope, $log, ProductService) {
		$log.log('home ctrl');

		$scope.init = function() {
			$scope.showLoadMoreBtn = true;
			$scope.catalogItems = [];
			$scope.featuredProduct = {};

			$scope.getFeaturedProduct();
			$scope.getProductList({order: 'date', skip: 0});
		};
		
		$scope.getProductList = function () {
			ProductService.getList({order: 'date', skip: $scope.catalogItems.length})
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

		$scope.getFeaturedProduct = function() {
			ProductService.getFeatured()
				.then(function(data) {
					$scope.featuredProduct = data;
				}, function(err) {
					console.log(err)
				});
		};

		$scope.init();
	}

})();
