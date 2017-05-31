/*
 * PortfolioSite - Jan Koszela v0.1.3 (https://github.com/pawellinkshell/PortfolioSite)
 * Copyright 2017 Jan Koszela
 * Licensed under MIT (https://github.com/pawellinkshell/PortfolioSite/blob/master/LICENSE)
 */
/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';

angular.module('aboutSection', []);
/**
 * Created by Jan Koszela on 09.05.2017.
 */
// Define the 'portfolioApp' module
var portfolioApp = angular.module('portfolioApp', [
	'ngTouch',
	'ngAnimate',
	'navBar',
	'headInfo',
	'serviceSection',
	'portfolioSection',
	'aboutSection',
	'teamSection',
	'clientsAside',
	'contactSection',
	'footerSection'
]);

// Define the 'AppControler' controller on the 'portfolioApp' module
portfolioApp.controller('AppController',
	function AppController($timeout, $scope) {

	});

/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';
angular.module('clientsAside', []);
/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';

angular.module('contactSection', []);
/**
 * Created by Jan Koszela on 10.05.2017.
 */

'use strict';

angular.module('footerSection', []);
/**
 * Created by Jan Koszela on 10.05.2017.
 */

'use strict';
angular.module('headInfo', []);
/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';

// Define the `navBar` module
angular.module('navBar', []);

/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';
angular.module('portfolioSection', ['ui.bootstrap',])
/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';

angular.module('serviceSection', []);
/**
 * Created by Jan Koszela on 10.05.2017.
 */
'use strict';
angular.module('teamSection', []);
// Components
angular.module('aboutSection')
	.component('aboutSection', {
		// Note: The URL is relative to our `index.html` file
		templateUrl: 'src/angular/about-section/about-section.template.html',

		controller: function AboutSectionController($http) {

			var $ctrl = this;

			$ctrl.scrollTo = function (event) {
				scrollTo(event);
			};

			// Get data from *.json file
			var url = 'resources/data/about-section.json';

			$http({
				method: 'GET',
				url: url
			}).then(function (success) {
				$ctrl.aboutSections = success.data;
				console.log("Data loaded from *.json file");
			}, function (error) {
				console.log("Cannot load data from *.json file");
			});

		}
	});
/**
 * Created by Jan Koszela on 09.05.2017.
 */
// Components
angular.module('clientsAside')
    .component('clientsAside', {
      // Note: The URL is relative to our `index.html` file
      templateUrl: 'src/angular/clients-aside/clients-aside.template.html',

      controller: function ClientsAsideController($http) {

        var $ctrl = this;

        // Get data from *.json file
        var url = 'resources/data/clients-aside.json';

        $http({
          method: 'GET',
          url: url
        }).then(function (success) {
          $ctrl.clientAsides = success.data;
          console.log("Data loaded from *.json file");
        }, function (error){
          console.log("Cannot load data from *.json file");
        });

      }
    });


/**
 * Created by Jan Koszela on 09.05.2017.
 */
// Components
angular.module('contactSection')
    .component('contactSection', {
      // Note: The URL is relative to our `index.html` file
      templateUrl: 'src/angular/contact-section/contact-section.template.html',

      controller: function ContactSectionController($scope) {
        $scope.submitForm = function (isValid) {

          //check to make sure the form is completely valid
          if(isValid) {
            alert("our form is amazing");
          }
        }

      }

    });


/**
 * Created by Jan Koszela on 09.05.2017.
 */
// Components
angular.module('footerSection')
    .component('footerSection', {
      // Note: The URL is relative to our `index.html` file
      templateUrl: 'src/angular/footer-section/footer-section.template.html'

    });


/**
 * Created by Jan Koszela on 09.05.2017.
 */
'use strict'
// Components
angular
    .module('headInfo')
    .component('headInfo', {
      // Note: The URL is relative to our `index.html` file
      templateUrl: 'src/angular/head-info/head-info.template.html',

      controller: function HeadInfoController() {
        this.scrollTo = function(event) {
          scrollTo(event)
        };
    }

});
/**
 * Created by Jan Koszela on 09.05.2017.
 */
'use strict';

// Components
angular.module('navBar')
	.component('navBar', {
		// Note: The URL is relative to our `index.html` file
		templateUrl: 'src/angular/nav-bar/nav-bar.template.html',

		controller: function NavBarController($timeout, $http) {
			var $ctrl = this;

			$ctrl.scrollTo = function (event) {
				scrollTo(event);
			};

			$timeout(function () {
				// // Offset for Main Navigation
				$('#mainNav').affix({
					offset: {
						top: 100
					}
				});
			});

			//
			// Get data from *.json file
			var url = 'resources/data/nav-bar.json';

			$http({
				method: 'GET',
				url: url
			}).then(function (success) {
				$ctrl.navlinks = success.data;
				console.log("Data loaded from *.json file");
			}, function (error) {
				console.log("Cannot load data from *.json file");
			});

		}

	});
/**
 * Created by Jan Koszela on 09.05.2017.
 */
'use strict';
var currentClickedId = 0;

// Components
angular.module('portfolioSection')
	.component('portfolioSection', {
		// Note: The URL is relative to our `index.html` file
		templateUrl: 'src/angular/portfolio-section/portfolio-section.template.html',

		controller: function PortfolioSectionController($uibModal, $log, $document,
			$http) {

			var $ctrl = this;
			$ctrl.animationsEnabled = true;

			// Get data from *.json file
			var url = 'resources/data/portfolio-modals.json';
			$http({
				method: 'GET',
				url: url
			}).then(function (success) {
				$ctrl.modalsGridData = success.data;
				console.log("Data loaded from *.json file");
			}, function (error) {
				console.log("Cannot load data from *.json file");
			});

			// Open modals
			$ctrl.open = function ($event) {
				currentClickedId = parseInt($event.currentTarget.hash.slice(-1)) - 1;

				var modalInstance = $uibModal.open({
					animation: $ctrl.animationsEnabled,
					templateUrl: 'src/angular/portfolio-section/portfolio-modals.template.html',
					controller: 'ModalInstanceCtrl',
					controllerAs: '$ctrl',
					resolve: {
						selectedItem: function () {
							return $ctrl.modalsGridData[currentClickedId];
						}
					}
				});

				//Backdrop call
				modalInstance.result.then(function (selectedItem) {
					$ctrl.selected = selectedItem;
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};

		}

	});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('portfolioSection').controller('ModalInstanceCtrl',
	function ($uibModalInstance, selectedItem) {
		var $ctrl = this;
		$ctrl.selectedItem = selectedItem;

		$ctrl.ok = function () {
			$uibModalInstance.close(this);
		};

	});


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