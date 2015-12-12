var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
		'homeCtrl',
		'articleCtrl',
		'catalogCtrl',
		'constructorCtrl',
		'productPageCtrl',
		'checkboxDirective',
		'textureDirective',
		'hiderDirective',
		'parallaxDirective',
		'questionDirective',
		'colorDirective',
		'rangeDirective',
		'youtube-embed',
		'angular-owl-carousel'
	])
	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			'use strict';
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
			$routeProvider
				.when('/', {
					redirectTo: '/home'
				})
				.when('/home', {
					controller: 'HomeCtrl',
					templateUrl: 'views/home.html'
				})
				.when('/article/:id', {
					controller: 'ArticleCtrl',
					templateUrl: 'views/article.html'
				})
				.when('/catalog', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog/:category', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog/:category/:subcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/catalog/:category/:subcategory/:subsubcategory', {
					controller: 'CatalogCtrl',
					templateUrl: 'views/catalog.html'
				})
				.when('/product/:category/:subcategory/:subsubcategory', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html'
				})
				// localhost:3000/product/zhaluzi/horizontalnye/aluminievye/roza-kolhoza
				.when('/product/:category/:subcategory/:subsubcategory/:texture', {
					controller: 'ProductPageCtrl',
					templateUrl: 'views/product.html'
				})
				.when('/constructor', {
					controller: 'ConstructorCtrl',
					templateUrl: 'views/constructor.html'
				})
				.otherwise({
					redirectTo: '/home'
				});
		}
	])
	.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
		var original = $location.path;
		$location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};
	}]);

app.constant('API_PATH', 'data/');

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
	angular.module('homeCtrl', ['benefitsDirective'])
		.controller('HomeCtrl', [
			'$scope',
			'$log',
			homeCtrl
		]);

	function homeCtrl($scope, $log) {
		$log.log('home ctrl');

		$scope.bigSliderItems = [
			'img/slide-1.jpg'
		];

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.catalogData = {};
	}

})();

(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			'$log',
			'$timeout',
			mainCtrl
		]);

	function mainCtrl($scope, $log, $timeout) {
		$log.log('main ctrl');

		$(function () {
			svg4everybody({
				fallback: function (src, svg, use) {
					var className = $(svg).attr('class');
					$(svg).replaceWith($('<span/>').addClass(className).css('background-image', 'url(' + src.replace('icons.svg#', '') + '.png)'));
				}
			});
		});

		$scope.refreshRange = function () {
			$timeout(function () {
				$scope.$broadcast('rzSliderForceRender');
			});
		};

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
	angular.module('productPageCtrl', ['texturesService', 'productService'])
		.controller('ProductPageCtrl', [
			'$scope',
			'$log',
			'youtubeEmbedUtils',
			'$location',
			'$routeParams',
			'TexturesService',
			'ProductService',
			'$sce',
			'$timeout',
			productPageCtrl
		]);

	function productPageCtrl($scope, $log, youtubeEmbedUtils, $location, $routeParams, TexturesService, ProductService, $sce, $timeout) {
		$log.log('product page ctrl');

		$scope.catalogItems = [1, 2, 3, 4];
		$scope.reviewsItems = [1, 2];
		$scope.gallery = {};
		$scope.gallery.currentImage = 'img/slide-1.jpg';
		$scope.textureModel = null;

		$scope.init = function () {
			$scope.getTextures();
			$scope.getProduct();
		};

		$scope.getProduct = function (path) {
			ProductService.getProduct(path)
				.then(function (data) {
					// Success
					$scope.product = data;
					$scope.product.cornice.text = $sce.trustAsHtml(data.cornice.text);
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.getTextures = function () {
			TexturesService.getTextures()
				.then(function (data) {
					// Success
					var category = $routeParams.category,
						subcategory = $routeParams.subcategory,
						subsubcategory = $routeParams.subsubcategory,
						texture = $routeParams.texture,
						currentTexture = TexturesService.getTextureByUrl(texture) || {
							id: 1
						},
						currentId = currentTexture.id;

					$scope.textures = data;
					TexturesService.getTextureByUrl(texture);
					$scope.textureModel = currentId;

					$scope.$watch('textureModel', function (newVal, oldVal) {
						if (newVal) {
							$scope.getTextureById(newVal);
							$location.path('product/' + category + '/' + subcategory + '/' + subsubcategory + '/' + $scope.currentTexture.url, false);
							$scope.gallery.currentImage = $scope.currentTexture.img;
						}
					});
				}, function (err) {
					// Error
					console.log(err);
				});
		};

		$scope.getTextureById = function (id) {
			$scope.currentTexture = TexturesService.getTextureById(id);
		};

		$scope.getYoutubeId = function (url) {
			return youtubeEmbedUtils.getIdFromURL(url);
		};

		$scope.priceSlider = {
			min: 100,
			max: 180,
			options: {
				floor: 0,
				ceil: 450
			}
		};



		$scope.init();

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

	angular.module('colorDirective', [])
		.directive('color', [
			colorDirective
		]);

	function colorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/color.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				fill: '@',
				name: '@',
				value: '@'
			},
			replace: true,
			link: colorDirectiveLink
		};
	}

	function colorDirectiveLink(scope, el, attr) {

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
			start = attr.parallaxStart || 0,
			end = attr.parallaxEnd || 500;

		angular.element($window).bind('scroll', function () {
			if (($window.scrollY <= end) && ($window.scrollY > start)) {
				el.css('transform', 'translateY(' + $window.scrollY / 5 + 'px)');
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

	angular.module('textureDirective', [])
		.directive('texture', [
			colorDirective
		]);

	function colorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/texture.html',
			scope: {
				model: '=',
				checked: '@',
				disabled: '@',
				fill: '@',
				name: '@',
				value: '@'
			},
			replace: true,
			link: textureDirectiveLink
		};
	}

	function textureDirectiveLink(scope, el, attr) {

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
	angular.module('productService', []).
	factory('ProductService', [
		'API_PATH',
		'$http',
		'$q',
		productService
	]);

	function productService(API_PATH, $http, $q) {
		var service = {
			getProduct: getProduct
		};
		return service;

		function getProduct(path) {
			var url = API_PATH + 'product.json',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					service.textures = data;
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

(function () {
	'use strict';
	angular.module('texturesService', []).
	factory('TexturesService', [
		'API_PATH',
		'$http',
		'$q',
		texturesService
	]);

	function texturesService(API_PATH, $http, $q) {
		var service = {
			getTextures: getTextures,
			getTextureById: getTextureById,
			getTextureByUrl: getTextureByUrl
		};
		return service;

		function getTextures(id) {
			var url = API_PATH + 'textures.json',
				defer = $q.defer();

			$http.get(url)
				.success(function (data) {
					service.textures = data;
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

		function getTextureById(id) {
			return _.findWhere(service.textures, {
				'id': parseInt(id, 10)
			});
		}

		function getTextureByUrl(url) {
			return _.findWhere(service.textures, {
				'url': url
			});
		}
	}
})();

//# sourceMappingURL=../js/app.js.map