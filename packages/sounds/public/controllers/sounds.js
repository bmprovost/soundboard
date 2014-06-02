'use strict';

angular.module('mean').controller('SoundsController', ['$scope', 'Global',
  function($scope, Global, Sounds) {
    $scope.global = Global;
    $scope.sounds = {name:'sounds'};

  }
]);