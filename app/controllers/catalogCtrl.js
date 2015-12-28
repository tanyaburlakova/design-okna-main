(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService', 'catalogService', 'configService'])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			'$routeParams',
			'$location',
			'ProductService',
			'CatalogService',
			'ConfigService',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log, $routeParams, $location, ProductService, CatalogService, ConfigService) {
		$log.log('catalog ctrl');
		$scope.init = function(){
			$scope.catalogItems = [];
			$scope.categoryChecks = {};
			if ($routeParams.subsubcategory){
				$scope.categoryChecks[$routeParams.subsubcategory] = true;
			}
			$scope.priceSlider = {
				min: ConfigService.minPrice,
				max: ConfigService.maxPrice,
				options: {
					floor: ConfigService.minPrice,
					ceil: ConfigService.maxPrice
				}
			};
			$scope.searchOptions = {
				sort: 'date',
				count: 9,
				min_price: ConfigService.minPrice,
				max_price: ConfigService.maxPrice,
				category: $routeParams.category,
				subcategory: $routeParams.subcategory,
				'subsubcategory[]': $routeParams.subsubcategory ? [$routeParams.subsubcategory] : []
			};
			$scope.$watchCollection('searchOptions', function(oldVal, newVal){
				$scope.getProductList();
			});
			$scope.$on('updateRangeSlider', function(e){
				$scope.searchOptions.min_price = $scope.priceSlider.min;
				$scope.searchOptions.max_price = $scope.priceSlider.max;
			});
			$scope.$watchCollection('categoryChecks', function(oldVal, newVal){
				var arr = [];
				angular.forEach($scope.categoryChecks, function(item, key){
					if (item){
						arr.push(key);
					}
				});
				$scope.searchOptions['subsubcategory[]'] = arr;
				if ($scope.searchOptions['subsubcategory[]'].length === 1){
					$location.path('catalog/' + $scope.searchOptions.category + '/' +
						$scope.searchOptions.subcategory + '/' + 
						$scope.searchOptions['subsubcategory[]'], false);
				} else {
					$location.path('catalog/' + $scope.searchOptions.category + '/' +
						$scope.searchOptions.subcategory, false);
				}
			});
			$scope.getCatalog();
		};

		$scope.getCatalog = function(){
			CatalogService.getCatalog({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory
			}).then(function(data){
				$scope.pageOptions = data;
				angular.forEach($scope.pageOptions.subsubcategories, function(item){
					item.checked = (item.slug === $routeParams.subsubcategory)?true:null;
				});
			}, function(err){
				console.log(err);
			});
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
