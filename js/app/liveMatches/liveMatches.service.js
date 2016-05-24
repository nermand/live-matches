(function () {
    'use strict';

    angular
    	.module('liveMatchesApp')
    	.factory('liveMatchesService', LiveMatchesService);

    LiveMatchesService.$inject = [
        '$log',
        '$q',
        '$http',
        '$timeout',
        'constants',
        'helperService',
        'cacheService'
    ];

    function LiveMatchesService(
        $log,
        $q,
        $http,
        $timeout,
        constants,
        helperService,
        cacheService) {

        return {
            retrieveLiveMatchesData: retrieveLiveMatchesData,
            fetchLiveMatches: fetchLiveMatches
        };

        function fetchLiveMatches() {
            if (constants.isOfflineMode) {
                return $http.get(constants.liveFeedMock);
            }else {
                return $http.jsonp(constants.liveFeed);
            }
        }

        function retrieveLiveMatchesData() {

            var deferred = $q.defer();
            var cached = cacheService.getData(constants.cacheKeys.liveData);

            if (cached) {
                $timeout(function() {
                    deferred.resolve(cached);
                });
            } else {
                fetchLiveMatches()
                    .then(function(data) {
                        var events = parseResponse(data);
                        cacheService.storeData(constants.cacheKeys.liveData, events);
                        deferred.resolve(events);
                    })
                    .catch(function(err) {
                        $log.warn(constants.errorMessages['liveMatchesService-parsing-error'], err);
                        deferred.reject();
                    });
            }

            return deferred.promise;
        }

        function parseResponse(res) {
            var data = [];

            if (res && res.data && res.data.liveEvents) {
                var liveEvents = res.data.liveEvents;

                data = liveEvents.map(function(le) {
                    var event = {
                        id: le.event && le.event.id,
                        homeTeamScore: le.liveData && le.liveData.score && le.liveData.score.home,
                        homeTeamName: le.event && le.event.homeName,
                        awayTeamScore: le.liveData && le.liveData.score && le.liveData.score.away,
                        awayTeamName: le.event && le.event.awayName,
                        sportType: helperService.mapSportType(le.event && le.event.sport),
                        start: le.event && le.event.start
                    };

                    return event;
                });
            }
            return data;
        }
    }
})();
