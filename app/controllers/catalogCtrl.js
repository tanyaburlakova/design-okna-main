(function () {
	'use strict';
	angular.module('catalogCtrl', ['productCtrl', 'productService', 'catalogService', 'configService', 'catalogResponsiveDirective'])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			'$routeParams',
			'$location',
			'ProductService',
			'CatalogService',
			'ConfigService',
			'ResponsiveService',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log, $routeParams, $location, ProductService, CatalogService, ConfigService, ResponsiveService) {
		$log.log('catalog ctrl');
		$scope.init = function(){
			$scope.responsive = ResponsiveService;
			$scope.$parent.constructorHeader = false;
			$scope.catalogItems = [];
			$scope.categoryChecks = {};
			if ($routeParams.subcategory){
				$scope.categoryChecks[$routeParams.subcategory] = true;
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
				'subcategory[]': $routeParams.subcategory ? [$routeParams.subcategory] : []
			};
			$scope.$watchCollection('searchOptions', function(oldVal, newVal){
				$scope.getProductList();
			});
			$scope.$on('rangeDirective.updateRangeSlider', function(e){
				$scope.searchOptions.min_price = $scope.priceSlider.min;
				$scope.searchOptions.max_price = $scope.priceSlider.max;
			});
			$scope.$watchCollection('categoryChecks', function(oldVal, newVal){
				if (!_.isEqual(oldVal, newVal)){
					var arr = [];
					angular.forEach($scope.categoryChecks, function(item, key){
						if (item){
							arr.push(key);
						}
					});
					$scope.searchOptions['subcategory[]'] = arr;
					if ($scope.searchOptions['subcategory[]'].length === 1){
						$location.path('catalog/' + $scope.searchOptions.category + '/' +
							$scope.searchOptions['subcategory[]'], false);
					} else {
						$location.path('catalog/' + $scope.searchOptions.category, false);
					}
				}
			});
			$scope.getCatalog();
			$scope.getProductList();
		};

		$scope.getCatalog = function(){
			CatalogService.getCatalog({
				category: $routeParams.category,
				subcategory: $routeParams.subcategory
			}).then(function(data){
				$scope.pageOptions = data;
				angular.forEach($scope.pageOptions.subcategories, function(item){
					item.checked = (item.slug === $routeParams.subcategory)?true:null;
				});
			}, function(err){
				$log.log(err);
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
					$log.log(err);
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
					$log.log(err);
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
