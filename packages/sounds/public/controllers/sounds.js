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
              $scope.find();
            });

            this.text = '';
        };

        $scope.remove = function(sound) {
            if (sound) {
                sound.$remove();
                for (var i in $scope.sounds) {
                    if ($scope.sounds[i] === sound) {
                        $scope.sounds.splice(i, 1);
                    }
                }
            } else {
                $scope.sound.$remove(function(response) {
                    $location.path('sounds');
                });
            }
        };

        $scope.update = function() {
            var sound = $scope.sound;
            if (!sound.updated) {
                sound.updated = [];
            }
            sound.updated.push(new Date().getTime());

            sound.$update(function() {
                $location.path('sounds/' + sound._id);
            });
        };

        $scope.find = function() {
            Sounds.query(function(sounds) {
                $scope.sounds = sounds;
            });
        };

        $scope.findOne = function() {
            Sounds.get({
                soundId: $stateParams.soundId
            }, function(sound) {
                $scope.sound = sound;
            });
        };

        $scope.playSound = function(text) {
          console.log(text);
          var plusText = text.split(' ').join('+');
          var sound = new Audio();
          sound.src = 'http://api.voicerss.org/?key=2d4b6e7431f74f16872f3262b8c48701&src=' + plusText;
          sound.play();
        };
      }
    ]);
