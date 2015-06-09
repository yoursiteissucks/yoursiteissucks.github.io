angular.module('MyApp')
  .controller('AuthCtrl', [ '$scope', 'authService', function($scope, authService) {

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
