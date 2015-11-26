(function () {
	'use strict';
	angular.module('questionService', []).
	factory('QuestionService', [
		'API_PATH',
		'$http',
		'$q',
		questionService
	]);

	function questionService(API_PATH, $http, $q) {
		var service = {
			getQuestion: getQuestion
		};
		return service;

		function getQuestion() {
			var url = API_PATH + 'questions.json',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					defer.resolve(data);
				})
				.error(function (res, errCode) {
					defer.reject({
						code: errCode,
						text: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		}
	}
})();
