(function () {
    'use strict';

    angular
        .module('liveMatchesApp')
        .controller('LiveMatchesController', LiveMatchesController);

    LiveMatchesController.$inject = [
        '$log',
        'constants',
        'liveMatchesService',
        'toastr'
    ];

    function LiveMatchesController(
        $log,
        constants,
        liveMatchesService,
        toastr) {

        var vm = this;
        vm.liveMatches = [];

        activate();

        function activate() {
            populateEvents();
        }

        function populateEvents() {
            liveMatchesService
                .retrieveLiveMatchesData()
                .then(function(events) {
                    if (angular.isArray(events)) {
                        vm.liveMatches = events;
                    }else {
                        toastr.error(
                            constants.errorMessages['liveMatchesController-parsing-error'],
                            'Error');
                    }

                })
                .catch(function(err) {
                    toastr.error(
                            constants.errorMessages['liveMatchesController-fetch-error'],
                            'Error');
                });
        }
    }
})();
