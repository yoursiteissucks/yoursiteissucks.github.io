angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'public/views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'public/views/about.html',
        controller: ''
      })
      .when('/reviews/:id', {
        templateUrl: 'public/views/detail.html',
        controller: ''
      })
      .when('/reviews', {
        templateUrl: 'public/views/reviews.html',
        controller: 'ReviewsCtrl'
      })
      .when('/signin', {
        templateUrl: 'public/views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signup', {
        templateUrl: 'public/views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/add', {
        templateUrl: 'public/views/add.html',
        controller: 'AddCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
