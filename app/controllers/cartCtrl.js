(function () {
	'use strict';
	angular.module('cartCtrl', ['cartService'])
		.controller('CartCtrl', [
			'$scope',
			'$log',
			cartCtrl
		]);

	function cartCtrl($scope, $log, CartService) {
		$log.log('cart ctrl');

		$scope.init = function() {
			$scope.items = [];
			$scope.addProduct();
		};
		
		$scope.pluralize = function(number){
			var cases = [2, 0, 1, 1, 1, 2];
			return $scope.pluralizeArray[ (number%100>4 && number%100<20)?
					2 :
					cases[(number%10<5)?number%10:5] ];
		};

		$scope.addProduct = function(product){
			var prod = product || {
				image: 'img/product.jpg',
				title: 'Жалюзи Рулонные Facette',
				price: 1700
			};
			$scope.showDropdown = true;
			$scope.items.push(prod)
		};

		$scope.removeProduct = function(key){
			$scope.items.splice(key, 1);
		};

		$scope.init();
	}

})();
