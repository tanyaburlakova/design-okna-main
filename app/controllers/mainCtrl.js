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
			img: 'img/slide-1.jpg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-1.jpg',
			title: 'Экологичность материалов2',
			img: 'img/slide-1.jpg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}, {
			bgImg: 'img/slide-1.jpg',
			title: 'Экологичность материалов3',
			img: 'img/slide-1.jpg',
			text: 'У каждого из наших поставщиков имеются сертификаты безовасности, в которых подтверждено, что пластик не токсичен'
		}];
	}

})();
