    'use strict';

    angular.module('mean').controller('SoundsController', ['$scope', 'Global',
      function($scope, $location, $http, Global, Sounds) {
        $scope.global = Global;
        $scope.sounds = {name:'sounds'};


        $scope.hasAuthorization = function(sound) {
          if (!sound || !sound.user) return false;
          return $scope.global.isAdmin || sound.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
          // Create url for API request
          console.log('hello');
          var url = 'http://tts-api.com/tts.mp3?q=' + this.text.replace(/ /g, '+') + '&return_url=1';
          var audioUrl = '';

          $http.get(url).success(function(data) {
            console.log(data);
            audioUrl = data;
          });

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
