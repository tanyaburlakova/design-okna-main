(function () {
	'use strict';
	angular.module('constructorPageCtrl', [])
		.controller('ConstructorPageCtrl', [
			'$scope',
			'$log',
			constructorPageCtrl
		]);

	function constructorPageCtrl($scope, $log) {
		$log.log('Constructor page ctrl');

	}

})();
