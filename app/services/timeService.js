(function () {
	'use strict';
	angular.module('timeService', ['configService']).
	factory('TimeService', [
		'$rootScope',
		'ConfigService',
		timeService
	]);

	function timeService($rootScope, ConfigService) {
		var time,
		    storeTime = new Date(ConfigService.serverTime);

		var logCurrentTime = function(){
			time = new Date();
		};

		var getStoreTime = function(){
			var current = new Date();
			var diff = current - time;
			return new Date(storeTime.getTime() + diff);
		};

		var isWorkingTime = function(){
			var time = getStoreTime();
			if (time.getHours() < ConfigService.closeHour){
					return true;
			} else {
				return false;
			}
		}

		var getWorkingHours = function(){
			return ConfigService.openHour + '-' + ConfigService.closeHour + 'ч';
		}

		var service = {
			logCurrentTime: logCurrentTime,
			getStoreTime: getStoreTime,
			isWorkingTime: isWorkingTime,
			getWorkingHours: getWorkingHours
		};
		return service;

	}
})();
