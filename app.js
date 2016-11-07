(function () {
'use strict';
    
    angular.module('shoppingListApp',[])
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .controller('ToBuyController',ToBuyController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
                                      
    function ToBuyController(ShoppingListCheckOffService) {
        var list = this;
        list.toBuyList = ShoppingListCheckOffService.getItems();
//        var subject = list.toBuy;
        list.remove = function(index){  
            ShoppingListCheckOffService.removeItem(index); 
        }
  
        list.addNew= function(index){
//            var item = ShoppingListCheckOffService.toBuy[index];
//            console.log(item);
            ShoppingListCheckOffService.addItem(index);  
            ShoppingListCheckOffService.removeItem(index);  
           //list.remove($index);
        }
        
        
    }; 
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
   function AlreadyBoughtController(ShoppingListCheckOffService){
       var purchased= this;
       purchased.list = ShoppingListCheckOffService.getBought();
       
       //console.log(purchased.list.name);
   }
    
   function ShoppingListCheckOffService(){
       var service = this; 
       var bought = [];
       var toBuy = [
            {
                name: "cookies", quantity: 10
            },
            {
                name: "fufu", quantity: 10
            },
            {
                name: "egusi", quantity: 5
            },
            {
                name: "bread", quantity: 4
            },
            {
                name: "sharwarmma", quantity: 5    
            }
        ];
       
       service.defaults = {
            emptyText : 'Nothing bought yet O'
        }
        
        service.addItem = function(index){
            var item = toBuy[index];
            service.itemName = item.name;
            service.itemQuantity = item.quantity;
//            console.log(service.itemName + ' of '+ service.itemQuantity);
            
            var toPush ={
                name:  service.itemName,
                quantity: service.itemQuantity
            };
            bought.push(toPush);
            
//            console.log(toBuy.length);
         }
        
        service.getItems = function(){   
//            
            console.log(toBuy.length);
            return toBuy;
//            } 
        }
        
        service.getBought = function(){
            return bought;
        }
        service.removeItem = function(index){
            toBuy.splice(index,1);
        }
    }
})();

