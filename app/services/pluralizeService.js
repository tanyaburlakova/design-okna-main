(function () {
	'use strict';
	angular.module('pluralizeService', []).
	factory('PluralizeService', [
		pluralizeService
	]);

	function pluralizeService() {
		// Array example [отложенный товар, отложенных товара, отложенных товаров]
		var wordArrays = {
			'отложенный товар': ['отложенный товар', 'отложенных товара', 'отложенных товаров'],
			'отзыв': ['отзыв', 'отзыва', 'отзывов']
		};
		var pluralizeWord = function(number, word){
			if (!!wordArrays[word]){
				return pluralizeArray(number, wordArrays[word]);
			} else {
				return null;
			}
		};
		var pluralizeArray = function(number, array){
			var cases = [2, 0, 1, 1, 1, 2];
			return array[ (number%100>4 && number%100<20)?
					2 :
					cases[(number%10<5)?number%10:5] ];
		};
		return {
			word: pluralizeWord,
			array: pluralizeArray
		};
	}
})();
