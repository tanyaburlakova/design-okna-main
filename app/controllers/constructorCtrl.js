(function () {
	'use strict';
	angular.module('constructorCtrl', [])
		.controller('ConstructorCtrl', [
			'$scope',
			'$log',
			constructorCtrl
		]);

	function constructorCtrl($scope, $log) {
		$log.log('article ctrl');

	}

})();
