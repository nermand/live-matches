(function() {
	'use strict';

	angular
		.module('liveMatchesApp')
		.directive('ubLiveEventsCarousel', LiveEventsCarousel);

    function LiveEventsCarousel () {
        return {
        	restrict: 'E',

            bindToController: {
                events: '='
            },

            templateUrl: 'js/app/components/liveEventsCarousel/live-events-carousel.html',

            controller: lecController,

            controllerAs: 'lec'
        };
	}

    function lecController() {}
})();
