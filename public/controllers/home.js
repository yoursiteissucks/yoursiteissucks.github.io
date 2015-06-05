angular.module('MyApp')
  .controller('HomeCtrl', ['$scope', function($scope) {
    // jQuery to manually focus input if html5 autofocus tag not working properly
    var websiteInput = $('input[name="websiteInput"]');
    websiteInput.focus();

    $scope.websiteInput = 'http://';

    // change brand name by timer
    var brandArray = ['SHIT', 'SLOW', 'SUCKS'];
    var counter = 0;
    var elem = $('#brandChange')[0];
    setInterval(brandChange, 1000);
    function brandChange() {
      elem.innerHTML = brandArray[counter];
      counter++;
      if(counter >= brandArray.length) {
        counter = 0;
      }
    }

    // jQuery set cursor on certain position on input box
    $.fn.setCursorPosition = function (pos) {
      this.each(function (index, elem) {
        if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      });
      return this;
    };
    $scope.setCursor = function() {
      websiteInput.setCursorPosition(7); // set cursor position
    }

  }]);
