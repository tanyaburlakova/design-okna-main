var app = angular.module('myApp', [
		'ngRoute',
		'mainCtrl'
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

angular.module('mainCtrl', [])
	.controller('MainCtrl', [
		'$scope',
		function ($scope) {
			'use strict';

		}
	]);

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