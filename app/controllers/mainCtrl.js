(function () {
	'use strict';
	angular.module('mainCtrl', ['dialogService', 'timeService'])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			'DialogService',
			'TimeService',
			'ResponsiveService',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout, DialogService, TimeService, ResponsiveService) {
		$log.log('main ctrl');
		$scope.constructorHeader = false;
		$scope.workingHours = TimeService.getWorkingHours();
		$scope.init = function(){
			$(function () {
				svg4everybody({
					fallback: function (src, svg, use) {
						var className = $(svg).attr('class');
						$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
					}
				});
			});
			TimeService.logCurrentTime();
		};

		$scope.openSearch = function(){
			DialogService.setState('search');
		};
		$scope.openFeedback = function(){
			DialogService.setState('feedback');
		};
		$scope.openCallme = function(){
			DialogService.setState('callme');
		};

		$scope.toggleOffCanvas = function(side){
			side = side || 'left';
			if ($scope.offCanvasSide !== side){
				$scope.offCanvasSide = side;
			} else {
				$scope.offCanvasSide = null;
			}
		};

		$scope.refreshRange = function () {
			$timeout(function () {
				$scope.$broadcast('rzSliderForceRender');
			});
		};

		$scope.$on('ResponsiveService.updateState', function(){
			if ($scope.offCanvasSide){
				if (ResponsiveService.getState('tablet') || ResponsiveService.getState('desktop')){
					$scope.$apply(function(){
						$scope.toggleOffCanvas($scope.offCanvasSide);
					});
				}
			}
		});

		$scope.init();
	}

})();
