var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
		'dialogCtrl',
		'articleCtrl',
		'catalogCtrl',
		'searchCtrl',
		'orderCtrl',
		'feedbackCtrl',
		'trendCtrl',
		'constructorPageCtrl',
		'productPageCtrl',
		'cartDirective',
		'constructorPreviewDirective',
		'checkboxDirective',
		'textureDirective',
		'hiderDirective',
		'offCanvasDirective',
		'responsiveDirective',
		'parallaxDirective',
		'questionDirective',
		'articlePreviewDirective',
		'dialogDirective',
		'colorDirective',
		'rangeDirective',
		'seoDirective',
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
				.when('/catalog', {
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
				console.log($route);
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
