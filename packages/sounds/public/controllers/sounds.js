    'use strict';

    angular.module('mean').controller('SoundsController', ['$scope', '$stateParams', '$location', '$http', 'Global',
      function($scope, $stateParams, $location, $http, Global, Sounds) {
        $scope.global = Global;
        $scope.sounds = {name:'sounds'};
        console.log($http);
        console.log($location);

        $scope.hasAuthorization = function(sound) {
          if (!sound || !sound.user) return false;
          return $scope.global.isAdmin || sound.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
          // Create url for API request
          var url = 'http://tts-api.com/tts.mp3?q=' + this.text.replace(/ /g, '+') + '&return_url=1';
          var audioUrl = '';
          console.log(url);

          $http({method: 'GET', url: url}).
            success(function(data) {
              audioUrl = data;
            }).
            error(function(data, status, headers, config) {
              console.log('Error: ' + status);
            }
          );


          var sound = new Sounds({
            text: this.text,
            audioUrl: audioUrl
          });
          sound.$save(function(response) {
            $location.path('sounds/' + response._id);
          });

          this.text = '';
        };

      }
    ]);
