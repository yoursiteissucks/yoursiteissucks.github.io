angular.module('MyApp')
  .controller('SigninCtrl', ['$scope', 'Auth', function($scope, Auth) {
    // jquery to manually focus on the first input
    // if html5 autofucus is not working properly on not referesh page.
    $('input[name=email]').focus();

    $scope.signin = function() {
      Auth.signin({
        email: $scope.email,
        password: $scope.password
      });
    };
  }]);
