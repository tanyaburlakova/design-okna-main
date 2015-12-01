var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'catalogCtrl',
		'productPageCtrl',
		'checkboxDirective',
		'questionDirective',
		'rangeDirective',
		'angular-owl-carousel'
	])
	.config([
		'$routeProvider',

		function ($routeProvider) {
			'use strict';
			var $menu = $('.main-menu'),
				$w = $(window);
			$w.on('scroll', function(){
				$menu.toggleClass('hidden', $w.scrollTop() > 500);
			});
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

app.constant('API_PATH', 'data/');
