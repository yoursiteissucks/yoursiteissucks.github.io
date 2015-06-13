angular.module('MyApp')
  .controller('ReviewsCtrl', ['$scope', 'reviewService', function($scope, reviewService) {
    $scope.reviews = reviewService.getReviews();

    $scope.addUpvote = function(review, currentUpvote) {
      reviewService.addUpvote(review, currentUpvote);
    };

    $scope.predicate = 'reviewDate';
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
    };

    $scope.voted = false;

    //Check to see if the window is top if not then display button
    var toTopButton = $('#scrollToTop');
    var mobileToTopButton = $('#mobile-scrollToTop');

    // hide both mobile or desktop version immediately at first load
    toTopButton.hide();
    mobileToTopButton.hide();

    // Check the scrollTop and check the width to show diff button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 130) {
        if ($(this).width() > 700) {
          toTopButton.fadeIn();
        } else {
          mobileToTopButton.fadeIn();
        }
      } else {
        toTopButton.hide();
        mobileToTopButton.hide();
      }
    });

    // Click event to both toTop buttons
    // $('.class1').add('.class2').click(some_function);
    toTopButton.add(mobileToTopButton).click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

  }]);
