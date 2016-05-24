(function () {
    'use strict';

    angular
    	.module('liveMatchesApp')
    	.factory('helperService', HelperService);

    HelperService.$inject = ['constants'];

    function HelperService(constants) {

        return {
            mapSportType: mapSportType
        };

        function mapSportType(sport) {
        	var sportsType;

        	switch (sport) {
        		case 'BASKETBALL':
        			sportsType = constants.sportsType.basketball;
        			break;
        		case 'TENNIS':
        			sportsType = constants.sportsType.tennis;
        			break;
        		case 'FOOTBALL':
        			sportsType = constants.sportsType.football;
        			break;
        		default:
        			sportsType = constants.sportsType.default;
        	}

        	return sportsType;
        }
    }
})();
