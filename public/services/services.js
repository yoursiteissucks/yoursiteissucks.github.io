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
  .factory('partyService', function(dataService) {
    var users = dataService.$child('users');
    var partyServiceObject = {
      saveParty: function(party, userId) {
        users.$child(userId).$child('parties').$add(party);
      },
      getPartiesByUserId: function(userId) {
        return users.$child(userId).$child('parties');
      }
    };
    return partyServiceObject;
  })
  .factory('textMessageService', function(dataService, partyService) {
    var textMessages = dataService.$child('textMessages');
    var textMessageServiceObject = {
      sendTextMessage: function(party, userId) {
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        };
        textMessages.$add(newTextMessage);
        partyService.getPartiesByUserId(userId).$child(party.$id).$update({notified: 'Yes'});
      }
    };

    return textMessageServiceObject;
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
