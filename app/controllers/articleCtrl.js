(function () {
	'use strict';
	angular.module('articleCtrl', ['articleService'])
		.controller('ArticleCtrl', [
			'$scope',
			'$log',
			'$sce',
			'$routeParams',
			'ArticleService',
			articleCtrl
		]);

	function articleCtrl($scope, $log, $sce, $routeParams, ArticleService) {
		$log.log('article ctrl');
		$scope.init = function(){
			$scope.article = {};
			$scope.getArticle();
		};

		$scope.getArticle = function(){
			ArticleService.getArticle($routeParams.slug)
				.then(function(data){
					$scope.article = data;
					$scope.article.content = $sce.trustAsHtml(data.text);
				}, function(err){
					console.log(err);
				});
		};

		$scope.init();
	}

})();
