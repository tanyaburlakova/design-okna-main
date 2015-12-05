(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			mainCtrl
		]);

	function mainCtrl($scope, $log) {
		$log.log('main ctrl');

		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

	}

})();
