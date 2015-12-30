(function () {
	'use strict';
	angular.module('texturesService', ['configService']).
	factory('TexturesService', [
		'API_PATH',
		'$http',
		'$q',
		'ConfigService',
		texturesService
	]);

	function texturesService(API_PATH, $http, $q, ConfigService) {
		var service = {
			getTextures: getTextures,
			getConstructorTextures: getConstructorTextures,
			getTextureById: getTextureById,
			getTextureByUrl: getTextureByUrl,
			filterTextures: filterTextures
		};
		return service;

		function getConstructorTextures(params) {
			var url = API_PATH + ConfigService.constructorTexturesPath,
				defer = $q.defer();

			$http.get(url, {params: params})
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

		function getTextures(params) {
			var url = API_PATH + ConfigService.texturesPath,
				defer = $q.defer();

			$http.get(url, {params: params})
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

		function filterTextures(params) {
			return _.findWhere(service.textures, params);
		};

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
