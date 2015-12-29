(function () {
	'use strict';
	angular.module('reviewsCtrl', ['reviewsService', 'pluralizeService'])
		.controller('ReviewsCtrl', [
			'$scope',
			'$log',
			'ReviewsService',
			'PluralizeService',
			reviewsCtrl
		]);

	function reviewsCtrl($scope, $log, ReviewsService, PluralizeService) {
		$log.log('reviews ctrl');

		$scope.init = function () {
			$scope.reviews = {};
			$scope.reviewFormVisible = false;
			$scope.getReviews($scope.productId);
		};

		$scope.pluralizeReview = function(number){
			return PluralizeService.word(number, 'отзыв');
		};

		$scope.getReviews = function (product) {
			ReviewsService.getReviews({product:product}, 5)
				.then(function (data) {
					// Success
					console.log(data);
					$scope.reviews = data;
					$scope.reviews.total = data.list.length;
					$scope.reviews.avg_rounded = Math.round(data.avg_rating);
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.toggleReviewForm = function(){
			$scope.reviewFormVisible = !$scope.reviewFormVisible;
		};

		$scope.loadMoreReviews = function(){
			$scope.reviews.list = ReviewsService.loadReviews($scope.reviews.list.length, 5);
		};

		$scope.init();
	}

})();
