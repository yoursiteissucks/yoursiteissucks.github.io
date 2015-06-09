angular.module('MyApp')
  .controller('NavCtrl', [ '$scope', 'authService', '$location', function($scope, authService, $location) {
    // Check nav bar links if current path then add "active" class
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    // Check the page url, add class to show alert if url matched
    $scope.isPage = function (viewLocation) {
      return viewLocation === $location.path();
    };

    // Method to signout a user on navbar using the authService.
    $scope.signout = function() {
      authService.signout();
    };

  }]);
