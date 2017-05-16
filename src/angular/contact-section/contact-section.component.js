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

