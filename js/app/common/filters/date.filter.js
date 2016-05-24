(function () {
    'use strict';

    angular
		.module('liveMatchesApp')
		.filter('datetime', Datetime);

    Datetime.$inject = ['$filter', 'constants'];

    function Datetime($filter, constants) {

        return function (input) {

        	var splits = input.split('T');
        	var datepart = splits && splits[0];

        	var inputDate = new Date(datepart);
        	var today = new Date();

        	var formatedTime = $filter('date')(new Date(input), 'HH:mm');
        	var formatedDate;

            if (today.toDateString() === inputDate.toDateString()) {
        		formatedDate = constants.todayString;
        	}else {
        		formatedDate = $filter('date')(new Date(input), 'yyyy-MM-dd');
        	}

            return formatedDate + ', ' + formatedTime;
        };
    }
})();
