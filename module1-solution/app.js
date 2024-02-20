(function () {
    'use strict';

    angular.module('App', [])
        .controller('Control', Control);

    Control.$inject = ['$scope'];
    function Control($scope) {
        $scope.count = 0;
        $scope.items = "";
        $scope.message = "";
        $scope.check = function(){
            var totalitems = countitems($scope.items);
            $scope.count = totalitems;
        }
        $scope.dispmessage = function(){
            $scope.message = messagetoshow($scope.count);

        }
    }
    function countitems(items){
        var totalitemsininput = items.split(",");
        totalitemsininput = totalitemsininput.filter(function(word){
            return word.trim() !== '';
        });
        return totalitemsininput.length;
    }
    function messagetoshow(num){
        if(num==0)
            return "Please enter data first";
        else if(num<=3)  
            return "Enjoy!";
        else
            return "Too much!";
    }
})();
