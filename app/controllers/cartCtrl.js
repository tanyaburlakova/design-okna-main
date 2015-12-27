(function () {
	'use strict';
	angular.module('cartCtrl', ['cartService'])
		.controller('CartCtrl', [
			'$scope',
			'$log',
			'CartService',
			cartCtrl
		]);

	function cartCtrl($scope, $log, CartService) {
		$log.log('cart ctrl');

		$scope.init = function() {
			$scope.items = CartService.getProducts();
			$scope.showDropdown = false;
		};
		
		$scope.pluralize = function(number){
			var cases = [2, 0, 1, 1, 1, 2];
			return $scope.pluralizeArray[ (number%100>4 && number%100<20)?
					2 :
					cases[(number%10<5)?number%10:5] ];
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
