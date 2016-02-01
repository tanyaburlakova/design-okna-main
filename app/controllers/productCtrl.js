(function () {
	'use strict';
	angular.module('productCtrl', ['cartService'])
		.controller('ProductCtrl', [
			'$scope',
			'$log',
			'CartService',
			productCtrl
		]);

	function productCtrl($scope, $log, CartService) {
		$log.log('product ctrl');
		$scope.init = function(){
			$scope.product.texture_id = -1;
		};

		$scope.addProductToCart = function(product){
			CartService.addProduct(product);
		};

		$scope.$watch('product.texture_id', function(){
			if ($scope.product.texture_id !== -1){
				var texture = _.findWhere($scope.product.textures, {id: $scope.product.texture_id});
				$scope.product.price = texture.price;
				$scope.product.texture = texture.model;
				$scope.product.texture_link = texture.url;
			}
		});

		$scope.init();
	}

})();
