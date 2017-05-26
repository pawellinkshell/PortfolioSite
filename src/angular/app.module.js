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
