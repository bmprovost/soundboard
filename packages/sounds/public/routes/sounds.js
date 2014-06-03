// 'use strict';

// angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
//   function($stateProvider, $urlRouterProvider) {
//     // Check if the user is connected
//     var checkLoggedin = function($q, $timeout, $http, $location) {
//       // Initialize a new promise
//       var deferred = $q.defer();

//       // Make an AJAX call to check if the user is logged in
//       $http.get('/loggedin').success(function(user) {
//         // Authenticated
//         if (user !== '0') $timeout(deferred.resolve);

//         // Not Authenticated
//         else {
//           $timeout(deferred.reject);
//           $location.url('/login');
//         }
//       });

//       return deferred.promise;
//     };

//     $stateProvider
//       .state('all sounds', {
//         url: '/sounds',
//         templateUrl: 'sounds/views/list.html'
//       })
//       .state('create sound', {
//         url: '/sounds/create',
//         templateUrl: 'sounds/views/create.html',
//         resolve: {
//           loggedin: checkLoggedin
//         }
//       })
//       .state('edit sound', {
//         url: '/sounds/:soundId/edit',
//         templateUrl: 'sounds/views/edit.html',
//         resolve: {
//           loggedin: checkLoggedin
//         }
//       })
//       .state('sound by id', {
//         url: '/sounds/:soundId',
//         templateUrl: 'sounds/views/view.html',
//         resolve: {
//           loggedin: checkLoggedin
//       }
//     });
//   }
// ]);
