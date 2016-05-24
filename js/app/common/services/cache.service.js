(function () {
    'use strict';

    angular
    	.module('liveMatchesApp')
    	.factory('cacheService', CacheService);

    CacheService.$inject = ['$localStorage', 'constants'];

    function CacheService($localStorage, constants) {

        return {
            storeData: storeData,
            getData: getData
        };

        function storeData(key, data) {
        	$localStorage[key] = new CacheObject(data);
        }

        function getData(key) {

        	var cache = $localStorage[key];

        	if (!cache) {
        		return null;
        	}

        	var storedDate = new Date(cache.storedDate);
        	var cachedDateValidity = new Date(storedDate.getTime() + constants.cacheValidity * 60000);
        	var now = new Date();

        	if (now > cachedDateValidity) {
        		delete $localStorage[key];
        		return null;
        	}else {
        		return cache.data;
        	}
        }

        function CacheObject(data) {
        	this.data = data;
        	this.storedDate = new Date();
        }
    }
})();
