// 'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('MyApp.services', [])
  .value('FIREBASE_URL', 'http://ysis.firebaseio.com/')
  // below factory does the same thing as above value, both are way to create services
  // .factory('FIREBASE_URL', function() {
  //   return 'http://ysis.firebaseio.com/';
  // });
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;
  })
  .factory('reviewService', function(dataService, $location) {
    var reviews = dataService.$child('reviews');
    var addReviewServiceObject = {
      addReview: function(review) {
        var newReview = {
          websiteInput: review.websiteInput,
          complainInput: review.complainInput,
          upvote: review.upvote,
          reviewDate: Date.now()
        };
        reviews.$add(newReview).then(function(data) {
          console.log(data);
          console.log(reviews);
          $location.path('/reviews');
        });
      },
      deleteReview: function(review) {

      },
      getReviews: function() {
        return reviews;
      },
      getCurrentReview: function(review) {
        return reviews.$child(review.$id);
      },
      addUpvote: function(review, currentUpvote) {
        var newUpvote = currentUpvote + 1;
        addReviewServiceObject.getCurrentReview(review).$update({upvote: newUpvote});
      }
    };
    return addReviewServiceObject;
  })
  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    var emails = dataService.$child('emails');

    var authServiceObject = {
      signup: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);
          authServiceObject.signin(user, function() {
            emails.$add({email: user.email});
          });
        });
      },
      signin: function(user, optionalCallBack) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          if (optionalCallBack) {
            optionalCallBack();
          };
          $location.path('/');
        });
      },
      signout: function() {
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  });
