(function () {
    'use strict';

    angular.module('data').service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + '/categories.json')
            }).then(function (response) {
                return response.data;
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + '/menu_items.json?category=' + categoryShortName)
            }).then(function (response) {
                for (const property in response.data) {
                    if (response.data[property]['category']['short_name'] === categoryShortName) {
                        return response.data[property]['menu_items'];
                    }
                }
            });
        };
    }
})();
