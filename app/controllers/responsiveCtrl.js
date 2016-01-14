(function () {
	'use strict';
	angular.module('responsiveCtrl', [])
		.controller('ResponsiveCtrl', [
			'$scope',
			'$log',
			'$window',
			responsiveCtrl
		]);

	function responsiveCtrl($scope, $log, $window) {
		$log.log('responsive ctrl');

		$scope.$window = $window;
	}

})();
