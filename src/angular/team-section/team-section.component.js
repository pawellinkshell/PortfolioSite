/**
 * Created by Jan Koszela on 09.05.2017.
 */
'use strict';
// Components

angular.module('teamSection')
	.component('teamSection', {
		// Note: The URL is relative to our `index.html` file
		templateUrl: 'src/angular/team-section/team-section.template.html',

		controller: function TeamSectionController($http) {

			var $ctrl = this;

			// Get data from *.json file
			var url = 'resources/data/team-section.json';
			$http({
				method: 'GET',
				url: url
			}).then(function (success) {
				console.log("Data loaded from *.json file");
				$ctrl.teamSections = success.data;
			}, function (error) {
				console.log("Cannot load data from *.json file");
				return error.data;
			});
		}

	});