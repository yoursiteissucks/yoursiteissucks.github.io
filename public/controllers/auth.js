angular.module('MyApp')
  .controller('AuthCtrl', [ '$scope', 'authService', '$location', function($scope, authService, $location) {
    // Check nav bar links if current path then add "active" class
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    // Object bound to inputs on the signup and signin pages.
    $scope.user = {email: '', password: ''};
    // Method to signup a new user using the authService.
    $scope.signup = function() {
      authService.signup($scope.user);
    };
    // Method to signin a user using the authService.
    $scope.signin = function() {
      authService.signin($scope.user);
    };
    // Method to signout a user using the authService.
    $scope.signout = function() {
      authService.signout();
    };


  }]);
