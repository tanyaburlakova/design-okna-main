(function () {
	'use strict';
	angular.module('cartCtrl', ['cartService', 'dialogService'])
		.controller('CartCtrl', [
			'$scope',
			'$log',
			'CartService',
			'DialogService',
			cartCtrl
		]);

	function cartCtrl($scope, $log, CartService, DialogService) {
		$log.log('cart ctrl');

		$scope.init = function() {
			$scope.items = CartService.getProducts();
			$scope.dropdownVisible = false;
		};

		$scope.showDropdown = function(){
			$scope.dropdownVisible = true;
		};

		$scope.hideDropdown = function(){
			$scope.dropdownVisible = false;
		};

		$scope.openOrder = function(){
			DialogService.setState('order');
		};

		$scope.removeProduct = function(key){
			CartService.removeProduct(key);
			if ($scope.items.length === 0){
				$scope.dropdownVisible = false;
			}
		};

		$scope.init();
	}

})();
