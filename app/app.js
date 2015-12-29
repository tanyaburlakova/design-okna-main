var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
		'articleCtrl',
		'catalogCtrl',
		'constructorPageCtrl',
		'productPageCtrl',
		'cartDirective',
		'constructorPreviewDirective',
		'checkboxDirective',
		'textureDirective',
		'hiderDirective',
		'parallaxDirective',
		'questionDirective',
		'colorDirective',
		'rangeDirective',
		'youtube-embed',
		'ngDropdowns',
		'angular-input-stars',
		'angular-owl-carousel',
		'LocalStorageModule'
	])
	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			'use strict';
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/', {
					controller: 'HomeCtrl',
					templateUrl: 'views/home.html'
				})
				.when('/article/:slug', {
					controller: 'ArticleCtrl',
					templateUrl: 'views/article.html'
				})
				.when('/search/:term', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog/:category', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog/:category/:subcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/product/:category/:subcategory/:product', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html'
				})
				// localhost:3000/product/zhaluzi/horizontalnye/aluminievye/roza-kolhoza
				.when('/product/:category/:subcategory/:product/:texture', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html'
				})
				.when('/constructor', {
					controller: 'ConstructorPageCtrl',
					templateUrl: 'views/constructor.html'
				})
				.otherwise({
					redirectTo: '/'
				});
		}
	])
	.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
		var original = $location.path;
		$location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};
	}]);

app.constant('API_PATH', 'data/');
