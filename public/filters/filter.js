/* Custom Filters */

angular.module('MyApp.filters', []).
  filter('findAndToArray', function() {
    return function (items, search) {
      var result = [];
      angular.forEach(items, function (value, key) {
        angular.forEach(value, function (value2, key2) {
          // loop through the reviews object and find the one with 'complainInput'
          // and push the object to our array. so that angular filter will work
          if (key2 === search) {
            result.push(value);
          }
        })
      });
      return result;
    }
  });
