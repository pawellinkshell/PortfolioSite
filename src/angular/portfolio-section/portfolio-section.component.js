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

