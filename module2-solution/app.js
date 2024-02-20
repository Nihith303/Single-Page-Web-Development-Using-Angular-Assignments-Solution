(function(){
'use strict';
angular.module('shoppingApp', [])
.controller('addItem', addItem)
.controller('ToBuylist', ToBuylist)
.controller('alreadyBought', alreadyBought)
.service('modifyListService', modifyListService)

addItem.$inject = ['modifyListService'];
function addItem(modifyListService){
    var add = this
    add.name = "";
    add.quantity = 0;
    add.addtoshopList = function(){
        modifyListService.addtoshopList(add.name, add.quantity);
    }
}

ToBuylist.$inject = ['modifyListService'];
function ToBuylist(modifyListService){
    var tobuy = this;
    tobuy.items = modifyListService.gettobuyList();
    tobuy.addtoBought = function(index){
        modifyListService.addtoBought(index);
    };
}

alreadyBought.$inject = ['modifyListService'];
function alreadyBought(modifyListService){
    var bought = this;
    bought.items = modifyListService.getboughtList();
}

function modifyListService(){
    var service = this;
    var BoughtItems = [];
    var tobuyItems = [{name: "Cookies", quantity : 10}, {name: "Chips", quantity: 5}, {name: "Cola", quantity: 2}, 
    {name: "Candies", quantity:100}, {name: "Lays", quantity: 10}];

    service.addtoshopList = function(nameofItem, quantityofItem){
        var newItem = {
            name : nameofItem,
            quantity : quantityofItem
        };
        tobuyItems.push(newItem);
    }

    service.addtoBought = function(index){
        BoughtItems.push(tobuyItems[index])
        tobuyItems.splice(index, 1);
    };
    service.gettobuyList = function(){
        return tobuyItems;
    };
    service.getboughtList = function(){
        return BoughtItems;
    };
}
})();