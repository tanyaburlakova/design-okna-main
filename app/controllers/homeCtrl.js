(function () {
	'use strict';
	angular.module('homeCtrl', ['benefitsDirective', 'productService', 'productCtrl', 'newsDirective', 'configService'])
		.controller('HomeCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'ProductService',
			'ConfigService',
			homeCtrl
		]);

	function homeCtrl($rootScope, $scope, $log, ProductService, ConfigService) {
		/*$log.log('home ctrl');*/

		$scope.init = function() {
			$rootScope.meta = {};
			$rootScope.meta.description = 'Современное оформление окон: жалюзи, карнизы, шторы, текстиль, рольставни в Москве.';
			$rootScope.meta.title = 'Мастерская по изготовлению жалюзи и штор в Москве.';
			$scope.$parent.constructorHeader = false;
			$scope.showLoadMoreBtn = true;
			$scope.catalogItems = [];
			$scope.featuredProduct = {};
			$scope.featuredArticle = ConfigService.homeArticleSlug;

			$scope.getFeaturedProduct();
			$scope.getProductList();
		};

		$scope.getProductList = function () {
			ProductService.getHomeList({skip: $scope.catalogItems.length, count: 8, mainPage: true})
				.then(function (data) {
					// Success
					if (data.length === 0){
						$scope.showLoadMoreBtn = false;
					} else {
						Array.prototype.push.apply($scope.catalogItems, data.items);
					}
					$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
				}, function (err) {
					// Error
					$log.log(err);
				});
		};

		$scope.getFeaturedProduct = function() {
			ProductService.getFeatured()
				.then(function(data) {
					$scope.featuredProduct = data;
				}, function(err) {
					$log.log(err)
				});
		};

		$scope.init();
	}

})();
