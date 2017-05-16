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

