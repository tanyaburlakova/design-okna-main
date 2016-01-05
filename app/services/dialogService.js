(function () {
	'use strict';
	angular.module('dialogService', []).
	factory('DialogService', [
		'$rootScope',
		dialogService
	]);

	function dialogService($rootScope) {
		var opened = false;

		var setState = function(newState){
			opened = newState;
			$rootScope.$broadcast('DialogService.updateState');
		};

		var getState = function(){
			return opened;
		};
		var service = {
			getState: getState,
			setState: setState
		};
		return service;

	}
})();
