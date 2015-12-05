var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'catalogCtrl',
		'productPageCtrl',
		'checkboxDirective',
		'hiderDirective',
		'parallaxDirective',
		'questionDirective',
		'rangeDirective',
		'youtube-embed',
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

app.constant('API_PATH', 'data/');
$(function () {
	svg4everybody({
		fallback: function (src, svg, use) {
			var className = $(svg).attr('class');
			$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
		}
	});
});
