(function () {
	'use strict';
	angular.module('cartCtrl', ['cartService', 'pluralizeService'])
		.controller('CartCtrl', [
			'$scope',
			'$log',
			'CartService',
			'PluralizeService',
			cartCtrl
		]);

	function cartCtrl($scope, $log, CartService, PluralizeService) {
		$log.log('cart ctrl');

		$scope.init = function() {
			$scope.items = CartService.getProducts();
			$scope.showDropdown = false;
		};
		
		$scope.pluralize = function(number){
			return PluralizeService.word(number, 'отложенный товар');
		};

		$scope.toggleDropdown = function(){
			$scope.showDropdown = !$scope.showDropdown;
		};


		$scope.removeProduct = function(key){
			CartService.removeProduct(key);
			if ($scope.items.length === 0){
				$scope.showDropdown = false;
			}
		};

		$scope.init();
	}

})();
