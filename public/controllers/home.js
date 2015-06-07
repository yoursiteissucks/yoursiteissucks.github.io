angular.module('MyApp')
  .controller('HomeCtrl', ['$scope', 'reviewService', function($scope, reviewService) {
    $scope.review = {websiteInput: 'http://', complainInput: '', upvote: 0};
    $scope.add = function() {
      reviewService.addReview($scope.review);
    };

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


    // // Autofocus and set the cursor at the right place.
    // // jQuery to manually focus input if html5 autofocus tag not working properly
    var websiteInput = $('input[name="websiteInput"]');
    // websiteInput.focus();
    //
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

    listen('load', window, init);

    function init() {
      var input = document.getElementById('websiteInput');
      var val = input.value;
      listen('keydown', input, replaceVal);
      listen('keyup', input, replaceVal);
      function replaceVal() {
        tempVal = input.value;
        if (tempVal.indexOf(val) === -1) {
          tempVal = val;
          input.value = val;
        }
      }
    }

    function listen(event, elem, func) {
      if (elem.addEventListener) {
        elem.addEventListener(event, func, false);
      } else if (elem.attachEvent) {
        elem.attachEvent('on' + event, func);
      }
    }

  }]);
