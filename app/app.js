var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'checkboxDirective',
		'angular-owl-carousel'
	])
	.config([
		'$routeProvider',

		function ($routeProvider) {
			'use strict';

			/*$routeProvider
				.when('/', {
					redirectTo: '/main'
				})
				.when('/main', {
					controller: 'MainCtrl',
					templateUrl: 'views/main.html'
				})
				.otherwise({
					redirectTo: '/main'
				});*/
		}
	]);
