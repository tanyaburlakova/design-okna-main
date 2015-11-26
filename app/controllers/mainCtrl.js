(function () {
	'use strict';
	angular.module('mainCtrl', [])
		.controller('MainCtrl', [
			'$scope',
			mainCtrl
		]);

	function mainCtrl($scope) {
		console.log('main ctrl');

		$scope.bigSliderItems = [
			'img/slide-2.jpg',
			'img/slide-3.jpg'
		];

		$scope.benefitsItems = [{
			bgImg: 'img/slide-1.jpg',
			title: 'Экологичность материалов1',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-2.jpg',
			title: 'Экологичность материалов2',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-3.jpg',
			title: 'Экологичность материалов3',
			img: 'img/tree.svg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}];

		$scope.catalogItems = [1, 2, 3, 4, 5, 6, 7, 8];

		$scope.catalogData = {};
	}

})();
