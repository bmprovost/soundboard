    'use strict';

    //Sounds service used for articles REST endpoint
    angular.module('mean').factory('Sounds', ['$resource',
      function($resource) {
        return $resource('sounds/:soundId', {
          soundId: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        });
      }
    ]);
