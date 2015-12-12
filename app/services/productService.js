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
