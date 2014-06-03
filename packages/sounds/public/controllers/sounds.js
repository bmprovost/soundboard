    'use strict';

    angular.module('mean').controller('SoundsController', ['$scope', '$stateParams', '$location', 'Global', 'Sounds',
      function($scope, $stateParams, $location, Global, Sounds) {
        $scope.global = Global;

        $scope.hasAuthorization = function(sound) {
          if (!sound || !sound.user) return false;
          return $scope.global.isAdmin || sound.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
          var sound = new Sounds({
            text: this.text,
          });
          sound.$save(function(response) {
            $location.path('sounds/' + response._id);
          });

          this.text = '';
        };

      }
    ]);
