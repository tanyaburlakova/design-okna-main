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
			$scope.order = {};
			$scope.order.phone = '+7';
			$scope.dropdownVisible = false;
		};
		
		$scope.showDropdown = function(){
			$scope.dropdownVisible = true;
		};

		$scope.hideDropdown = function(){
			$scope.dropdownVisible = false;
		};

		$scope.$watch('order.phone', function(newVal){
			if (newVal.length > 12){
				$scope.order.phone = $scope.order.phone.substr(0, 12);
			}
		});

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
