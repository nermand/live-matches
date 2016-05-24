(function() {
	'use strict';

	angular
		.module('liveMatchesApp')
		.directive('ubSpinner', Spinner);

	function Spinner() {
        return {
        	restrict: 'E',

            templateUrl: 'js/app/components/spinner/spinner.html'
        };
	}
})();
