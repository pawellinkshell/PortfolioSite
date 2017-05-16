// Components
angular.module('aboutSection')
    .component('aboutSection', {
      // Note: The URL is relative to our `index.html` file
      templateUrl: 'src/angular/about-section/about-section.template.html',

      controller: function AboutSectionController($http) {

        var $ctrl = this;

        // Get data from *.json file
        var url = 'resources/data/about-section.json';

        $http({
          method: 'GET',
          url: url
        }).then(function (success) {
          $ctrl.aboutSections = success.data;
          console.log("Data loaded from *.json file");
        }, function (error){
          console.log("Cannot load data from *.json file");
        });

      }
    });