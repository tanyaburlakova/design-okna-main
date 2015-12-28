(function () {
	'use strict';
	angular.module('texturesService', ['configService']).
	factory('TexturesService', [
		'API_PATH',
		'$http',
		'$q',
		texturesService
	]);

	function texturesService(API_PATH, $http, $q) {
		var service = {
			getTextures: getTextures,
			getConstructorTextures: getConstructorTextures,
			getTextureById: getTextureById,
			getTextureByUrl: getTextureByUrl
		};
		return service;

		function getConstructorTextures() {
			var url = API_PATH + 'constructor-textures.json',
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

		function getTextures() {
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
