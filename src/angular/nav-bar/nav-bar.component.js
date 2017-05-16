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


        $ctrl.scrollTo = function(event) {
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
        }, function (error){
          console.log("Cannot load data from *.json file");
        });

      }

    });