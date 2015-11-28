var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'catalogCtrl',
		'checkboxDirective',
		'questionDirective',
		'rangeDirective',
		'angular-owl-carousel'
	])
	.config([
		'$routeProvider',

		function ($routeProvider) {
			'use strict';

			/*$routeProvider
				.when('/', {
					redirectTo: '/main'
				})
				.when('/main', {
					controller: 'MainCtrl',
					templateUrl: 'views/main.html'
				})
				.otherwise({
					redirectTo: '/main'
				});*/
		}
	]);

app.constant('API_PATH', 'data/');

(function () {
	'use strict';
	angular.module('catalogCtrl', [])
		.controller('CatalogCtrl', [
			'$scope',
			'$log',
			catalogCtrl
		]);

	function catalogCtrl($scope, $log) {
		$log.log('catalog ctrl');

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};
	}

})();

(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			mainCtrl
		]);

	function mainCtrl($scope, $log) {
		$log.log('main ctrl');

		$scope.bigSliderItems = [
			'img/slide-1.jpg'
		];

		$scope.benefitsItems = [{
			bgImg: 'img/slide-1.jpg',
			title: 'Экологичность материалов1',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-2.jpg',
			title: 'Экологичность материалов2',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-3.jpg',
			title: 'Экологичность материалов3',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}];

		$scope.catalogData = {};
	}

})();

(function () {
	'use strict';
	angular.module('questionCtrl', ['questionService'])
		.controller('QuestionCtrl', [
			'$scope',
			'$log',
			'QuestionService',
			questionCtrl
		]);

	function questionCtrl($scope, $log, QuestionService) {
		$log.log('question ctrl');

		$scope.init = function () {
			$scope.getQuestion();
		};

		$scope.getQuestion = function () {
			QuestionService.getQuestion()
				.then(function (data) {
					// Success
					$scope.question = data;
				}, function (err) {
					// Error
					$log.error(err);
				});
		};

		$scope.init();
	}

})();

(function () {
	'use strict';

	angular.module('checkboxDirective', [])
		.directive('checkbox', [
			checkboxDirective
		]);

	function checkboxDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/checkbox.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				name: '@',
				label: '@',
				value: '@'
			},
			replace: true,
			link: checkboxDirectiveLink
		};
	}

	function checkboxDirectiveLink(scope, el, attr) {

	}
})();

(function () {
	'use strict';

	angular.module('questionDirective', ['questionCtrl'])
		.directive('question', [
			questionDirective
		]);

	function questionDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/question.html',
			controller: 'QuestionCtrl',
			scope: {
				number: '@',
				title: '@',
				description: '@',
				link: '@'
			},
			replace: true,
			link: questionDirectiveLink
		};
	}

	function questionDirectiveLink(scope, el, attr) {
		attr.link = attr.link || '#';
	}
})();

(function () {
	'use strict';

	angular.module('rangeDirective', ['rzModule'])
		.directive('range', [
			rangeDirective
		]);

	function rangeDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/range.html',
			scope: {
				min: '=',
				max: '=',
				options: '='
			},
			replace: true,
			link: rangeDirectiveLink
		};
	}

	function rangeDirectiveLink(scope, el, attr) {
		scope.$watch('min', function (value) {
			console.log(value);
		});
	}
})();

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

//# sourceMappingURL=../js/app.js.map