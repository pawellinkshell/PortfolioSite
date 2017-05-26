/**
 * Created by Jan Koszela on 09.05.2017.
 */
'use strict';

// Components
angular.module('serviceSection')
	.component('serviceSection', {
		// Note: The URL is relative to our `index.html` file
		templateUrl: 'src/angular/service-section/service-section.template.html',

		controller: function ServiceSectionController($http, $q) {

			var $ctrl = this;

			// Get data from *.json file
			var url = 'resources/data/service-section.json';
			$http({
				method: 'GET',
				url: url
			}).then(function (success) {
				console.log("Data loaded from *.json file");
				$ctrl.serviceSections = success.data;
			}, function (error) {
				console.log("Cannot load data from *.json file");
			});

		}
	})