var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
		'articleCtrl',
		'catalogCtrl',
		'constructorCtrl',
		'productPageCtrl',
		'checkboxDirective',
		'hiderDirective',
		'parallaxDirective',
		'questionDirective',
		'colorDirective',
		'rangeDirective',
		'youtube-embed',
		'angular-owl-carousel'
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
					redirectTo: '/home'
				})
				.when('/home', {
					controller: 'HomeCtrl',
					templateUrl: 'views/home.html'
				})
				.when('/article/:id', {
					controller: 'ArticleCtrl',
					templateUrl: 'views/article.html'
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
				.when('/catalog/:category/:subcategory/:subsubcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				// localhost:3000/product/zhaluzi/horizontalnye/aluminievye/roza-kolhoza
				.when('/product/:category/:subcategory/:subsubcategory/:texture', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html'
				})
				.when('/constructor', {
					controller: 'ConstructorCtrl',
					templateUrl: 'views/constructor.html'
				})
				.otherwise({
					redirectTo: '/home'
				});
		}
	]);

app.constant('API_PATH', 'data/');
