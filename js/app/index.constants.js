(function() {
  'use strict';

  var constants = {
    isOfflineMode: false,

    //**jsonp
    liveFeed: 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp'
              + '?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a&callback=JSON_CALLBACK',
    //**json
    /* liveFeed: 'http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp'
              + '?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a',
    */

    //**mocked data
    liveFeedMock: 'js/app/data/events.json',

    sportsType: {
    	basketball: 'basketball',
    	tennis: 'tennis',
    	football: 'football',
    	default: 'default'
    },

    todayString: 'Today',

    cacheValidity: 2, // in minutes

    cacheKeys: {
      liveData: 'live-data'
    },

    errorMessages: {
      'liveMatchesController-parsing-error': 'Error occurred while parsing live events',
      'liveMatchesController-fetch-error': 'Could not retrieve live matches',
      'liveMatchesService-fetch-error': 'Error occurred while fetching live data',
    }
  };

  angular
    .module('liveMatchesApp')
    .constant('constants', constants);

})();
