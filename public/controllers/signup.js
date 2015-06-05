angular.module('MyApp')
  .controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
    // jquery to manually focus on the first input
    // if html5 autofucus is not working properly on not referesh page.
    $('input[name=username]').focus();

    $scope.signup = function() {
      Auth.signup({
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      });
    };
  }]);
