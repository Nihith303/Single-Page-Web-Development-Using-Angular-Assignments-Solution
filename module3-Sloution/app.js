(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onEmpty: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.shortName = '';

        menu.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm.toLowerCase());

            promise.then(function(items) {
                if (items && items.length > 0) {
                    menu.message = '';
                    menu.found = items;
                } else {
                    menu.message = 'Nothing found!';
                    menu.found = [];
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        menu.removeMenuItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(response) {
                var foundItems = [];
                for (const categoryKey in response.data) {
                    if (response.data.hasOwnProperty(categoryKey)) {
                      const category = response.data[categoryKey];
                      category.menu_items.forEach(item => {
                        if (searchTerm.length > 0 && item.description.toLowerCase().indexOf(searchTerm) !== -1) {
                            foundItems.push(item);
                        }
                      });
                    }
                  }
                return foundItems;
            });
        };
    }
})();
