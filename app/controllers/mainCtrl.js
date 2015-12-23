(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout) {
		$log.log('main ctrl');

		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

		$scope.dialogShowed = false;
		$scope.toggleDialog = function(){
			$scope.dialogShowed = !$scope.dialogShowed;
		};

		$scope.refreshRange = function () {
			$timeout(function () {
				$scope.$broadcast('rzSliderForceRender');
			});
		};

	}

})();
