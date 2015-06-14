angular.module('MyApp', ['ngRoute', 'firebase', 'MyApp.services', 'MyApp.filters'])
  .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
    // $locationProvider is a built-in AngularJS service for
    // configuring apps linking paths.
    // Using this service you can enable HTML5 pushState or change URL prefix from # to something like #!
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'public/views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/about', {
        templateUrl: 'public/views/about.html',
        controller: ''
      })
      // .when('/reviews/:id', {
      //   templateUrl: 'public/views/detail.html',
      //   controller: ''
      // })
      .when('/reviews', {
        templateUrl: 'public/views/reviews.html',
        controller: 'ReviewsCtrl'
      })
      .when('/signin', {
        templateUrl: 'public/views/signin.html',
        controller: 'AuthCtrl'
      })
      .when('/signup', {
        templateUrl: 'public/views/signup.html',
        controller: 'AuthCtrl'
      })
      .when('/faq', {
        templateUrl: 'public/views/faq.html',
        controller: ''
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
