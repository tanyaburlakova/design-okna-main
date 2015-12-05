(function () {
	'use strict';
	angular.module('articleCtrl', [])
		.controller('ArticleCtrl', [
			'$scope',
			'$log',
			articleCtrl
		]);

	function articleCtrl($scope, $log) {
		$log.log('article ctrl');


	}

})();
