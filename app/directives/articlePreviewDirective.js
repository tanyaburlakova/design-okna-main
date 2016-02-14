(function () {
	'use strict';

	angular.module('articlePreviewDirective', ['articleCtrl'])
		.directive('articlePreview', [
			articlePreviewDirective
		]).filter('unsafe', function($sce) { return $sce.trustAsHtml; });

	function articlePreviewDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/article-preview.html',
			controller: 'ArticleCtrl',
			scope: {
				slug: '@'
			},
			replace: true,
			link: articlePreviewDirectiveLink
		};
	}

	function articlePreviewDirectiveLink(scope, el, attr) {
		scope.slug = attr.slug;
	}
})();
