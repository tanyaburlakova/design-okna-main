var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'catalogCtrl',
		'productPageCtrl',
		'checkboxDirective',
		'hiderDirective',
		'parallaxDirective',
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
	angular.module('benefitsCtrl', ['benefitsService'])
		.controller('BenefitsCtrl', [
			'$scope',
			'$log',
			'BenefitsService',
			benefitsCtrl
		]);

	function benefitsCtrl($scope, $log, BenefitsService) {
		$log.log('benefits ctrl');

		var url = $scope.url;

		$scope.init = function () {
			$scope.getBenefits(url);
		};

		$scope.getBenefits = function (url) {
			BenefitsService.getBenefits(url)
				.then(function (data) {
					// Success
					$scope.benefits = data;
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
	angular.module('hiderCtrl', [])
		.controller('HiderCtrl', [
			'$scope',
			'$log',
			'$window',
			hiderCtrl
		]);

	function hiderCtrl($scope, $log, $window) {
		$log.log('hider ctrl');

		$scope.$window = $window;
	}

})();

(function () {
	'use strict';
	angular.module('mainCtrl', ['benefitsDirective'])
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

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.catalogData = {};
	}

})();

(function () {
	'use strict';
	angular.module('parallaxCtrl', [])
		.controller('ParallaxCtrl', [
			'$scope',
			'$log',
			'$window',
			parallaxCtrl
		]);

	function parallaxCtrl($scope, $log, $window) {
		$log.log('parallax ctrl');

		$scope.$window = $window;
	}

})();

(function () {
	'use strict';
	angular.module('productPageCtrl', [])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log) {
		$log.log('product page ctrl');

		$scope.catalogItems = [1, 2, 3, 4];
		$scope.reviewsItems = [1, 2];
		$scope.gallery = {};
		$scope.gallery.currentImage = 'img/slide-1.jpg';

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

	angular.module('benefitsDirective', ['benefitsCtrl'])
		.directive('benefits', [
			benefitsDirective
		]);

	function benefitsDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/benefits.html',
			controller: 'BenefitsCtrl',
			scope: {
				title: '@',
				url: '@'
			},
			replace: true,
			link: benefitsDirectiveLink
		};
	}

	function benefitsDirectiveLink(scope, el, attr) {
		attr.url = attr.url || '#';
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

	angular.module('hiderDirective', ['hiderCtrl'])
		.directive('hider', [
			menuHiderDirective
		]);

	function menuHiderDirective() {
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			controller: 'HiderCtrl',
			link: hiderDirectiveLink
		};
	}

	function hiderDirectiveLink(scope, el, attr) {
		var $window = scope.$window,
			hidePoint = attr.hiderPoint || 0,
			className = attr.hiderClass || 'hidden';

		angular.element($window).bind('scroll', function () {
			el.toggleClass(className, $window.scrollY > hidePoint);
		});
	}
})();

(function () {
	'use strict';

	angular.module('parallaxDirective', ['parallaxCtrl'])
		.directive('parallax', [
			parallaxDirective
		]);

	function parallaxDirective() {
		return {
			restrict: 'A',
			scope: {},
			replace: true,
			controller: 'ParallaxCtrl',
			link: parallaxDirectiveLink
		};
	}

	function parallaxDirectiveLink(scope, el, attr) {
		var $window = scope.$window,
			start   = attr.parallaxStart || 0,
			end     = attr.parallaxEnd || 500;

		angular.element($window).bind('scroll', function () {
			if (($window.scrollY <= end) && ($window.scrollY > start)){
				el.css('background-position-y', 50 - $window.scrollY/10 + '%');
			}
		});
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
				options: '@'
			},
			replace: true,
			link: rangeDirectiveLink
		};
	}

	function rangeDirectiveLink(scope, el, attr) {
		scope.options = angular.fromJson(attr.options);

		var min = scope.options.floor,
			max = scope.options.ceil;

		scope.$watch('min', function (value) {
			if (value > max) {
				scope.min = scope.max;
			}
			if (value < min) {
				scope.min = min;
			}

			if (scope.min > scope.max) {
				scope.min = scope.max;
			}
		});

		scope.$watch('max', function (value) {
			if (value > max) {
				scope.max = max;
			}
			if (value < min) {
				scope.max = scope.min;
			}
			if (scope.max < scope.min) {
				scope.max = scope.min;
			}
		});
	}
})();

(function () {
	'use strict';
	angular.module('benefitsService', []).
	factory('BenefitsService', [
		'API_PATH',
		'$http',
		'$q',
		benefitsService
	]);

	function benefitsService(API_PATH, $http, $q) {
		var service = {
			getBenefits: getBenefits
		};
		return service;

		function getBenefits(apiUrl) {
			var url = API_PATH + apiUrl,
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