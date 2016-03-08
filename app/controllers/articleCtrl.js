(function () {
	'use strict';
	angular.module('articleCtrl', ['articleService', 'socialShareService'])
		.controller('ArticleCtrl', [
			'$rootScope',
			'$scope',
			'$log',
			'$sce',
			'$routeParams',
			'ArticleService',
			'SocialShareService',
			articleCtrl
		]);

	function articleCtrl($rootScope, $scope, $log, $sce, $routeParams, ArticleService, SocialShareService) {
		/*$log.log('article ctrl');*/
		var networks = ['vk', 'ok', 'fb'];
		$scope.init = function(){
			$scope.$parent.constructorHeader = false;
			$scope.article = {};
			$scope.socials = [];
			$scope.getArticle();
		};

		$scope.getArticle = function(){
			var slug = $routeParams.slug || $scope.slug;
			ArticleService.getArticle(slug)
				.then(function(data){
					$rootScope.meta = {};
					$rootScope.meta.description = data.description;
					$rootScope.meta.title = data.title;
					$scope.$parent.blockContent = !!data.blockContent ? data.blockContent : '';
					$scope.article = data;
					$scope.article.content = $sce.trustAsHtml(data.text);
					$scope.prepareShareUrls();
				}, function(err){
					$log.log(err);
				});
		};

		$scope.prepareShareUrls = function(){
			angular.forEach(networks, function(value, key){
				$scope.socials.push({
					name: value,
					icon: 'icons/icons.svg#' + value,
					url: SocialShareService.getShareUrl(value, {
						title: $scope.article.title,
						url: $scope.article.url,
						description: $sce.trustAsHtml($scope.article.description),
						image: $scope.article.main_img
					})
				});
			});
		};

		$scope.init();
	}

})();
