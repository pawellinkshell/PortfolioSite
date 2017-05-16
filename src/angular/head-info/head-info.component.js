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