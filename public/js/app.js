var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl',
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

(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			mainCtrl
		]);

	function mainCtrl($scope) {
		console.log('main ctrl');

		$scope.bigSliderItems = [
			'img/slide-2.jpg',
			'img/slide-3.jpg'
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
	}

})();

angular.module('someDirective', [])
	.controller('SomeCtrl', [
		'$scope',
		function ($scope) {
			'use strict';


		}
	])
	.directive('some', function () {
		'use strict';
		return {
			restrict: 'E',
			controller: 'MainCtrl',
			scope: {}
		};
	});

app.service('ItemService', ['$http', '$q',
	function ($http, $q) {
		'use strict';
		var item = this;
		item.items = {};

		filter.getItems = function () {
			var url = 'api/url/',
				defer = $q.defer();
			$http.get(url)
				.success(function (data) {
					filter.types = data;
					defer.resolve(data);
				})
				.error(function (data) {
					defer.reject({
						error: 'api access [%s] error!'.replace('%s', url)
					});
				});

			return defer.promise;
		};

		return item;
	}
]);

//# sourceMappingURL=../js/app.js.map