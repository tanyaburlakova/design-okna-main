(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService', 'configService'])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			'$routeParams',
			'ProductService',
			'ConfigService',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log, $routeParams, ProductService, ConfigService) {
		$log.log('catalog ctrl');
		$scope.init = function(){
			$scope.catalogItems = [];
			$scope.searchOptions = {
				order: 'date',
				count: 9,
				min_price: ConfigService.minPrice,
				max_price: ConfigService.maxPrice,
				category: $routeParams.category,
				subcategory: $routeParams.subcategory
			};
			$scope.priceSlider = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
				options: {
					floor: ConfigService.minPrice,
					ceil: ConfigService.maxPrice
				}
			};
			$scope.$watchCollection('searchOptions', function(oldVal, newVal){
				$scope.getProductList();
			});
			$scope.$on('updateRangeSlider', function(e){
				$scope.searchOptions.min_price = $scope.priceSlider.min;
				$scope.searchOptions.max_price = $scope.priceSlider.max;
			});

			$scope.addProductList();
		};

		$scope.addProductList = function () {
			ProductService.getList(angular.extend({}, $scope.searchOptions, {skip: $scope.catalogItems.length}))
				.then(function (data) {
					// Success
					if (data.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						$scope.showLoadMoreBtn = true;
						Array.prototype.push.apply($scope.catalogItems, data);
					}
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.getProductList = function() {
			ProductService.getList($scope.searchOptions)
				.then(function (data) {
					// Success
					if (data.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						$scope.showLoadMoreBtn = true;
						$scope.catalogItems = data;
					}
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.toggleSort = function(sortTerm){
			if ($scope.searchOptions.sort === sortTerm){
				$scope.searchOptions.sort = null
			} else {
				$scope.searchOptions.sort = sortTerm;
			}
		};

		$scope.init();
	}

})();
