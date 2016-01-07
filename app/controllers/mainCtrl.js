(function () {
	'use strict';
	angular.module('mainCtrl', ['dialogService'])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			'DialogService',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout, DialogService) {
		$log.log('main ctrl');
		$scope.constructorHeader = false;

		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

		$scope.openSearch = function(){
			DialogService.setState('search');
		};
		$scope.openFeedback = function(){
			DialogService.setState('feedback');
		};
		$scope.openOrder = function(){
			DialogService.setState('order');
		};

		$scope.refreshRange = function () {
			$timeout(function () {
				$scope.$broadcast('rzSliderForceRender');
			});
		};

	}

})();
