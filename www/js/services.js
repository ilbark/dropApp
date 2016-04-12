angular.module('starter.services', [])

/**
* A simple example service that returns some data.
*/
.factory('Houses', function ($http, $window) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var stores;
    var houses;

    return {
        save: function (houses) {
            $window.localStorage['Houses'] = JSON.stringify(houses);
            console.log(JSON.parse($window.localStorage['Houses'] || '{}'));
        },
        get: function () {
            return JSON.parse($window.localStorage['Houses'] || '{}');         
        },
        all: function (user) {
            return $http.jsonp('http://www.valetcleaning.com/vclip/index.php?callback=JSON_CALLBACK&action=check-user&user_id=' + user.email + '&user_pwd=' + user.password);
        },
        getStore: function (storeId) {
            // Simple index lookup
            tempIndex = null;
            tempArry = JSON.parse($window.localStorage.getItem('Stores'));
            for (i = 0; i < tempArry.length; i++) {
                if (tempArry[i]['id'] == storeId) {
                    tempIndex = i;
                }
            }
            if (tempIndex === null) {
                return null;
            }
            else {
                return tempArry[tempIndex];
            }
        },
        getStoreFromServer: function (storeId) {
            return $http.jsonp('http://www.valetcleaning.com/vclip/index.php?callback=JSON_CALLBACK&action=search-store&store_id=' + storeId);
        },
        saveStores: function (value) {
            $window.localStorage['Stores'] = JSON.stringify(value);
        },
        getStores: function () {
            return JSON.parse($window.localStorage['Stores'] || '{}');
        },
        getCoupon: function (storeId) {
            return $http.jsonp('http://www.valetcleaning.com/vclip/index.php?callback=JSON_CALLBACK&action=search-coupon&store_id=' + storeId);
        }
    }
})

.factory('Customers', function ($http, $window) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var user;

    return {
        createAccount: function (newUser) {
            return $http.jsonp('http://www.valetcleaning.com/vclip/user.php?callback=JSON_CALLBACK&action=create&user_id=' + newUser.email + '&user_pwd=' + newUser.password);
        },
        confirmAccount: function (newUser) {
            return $http.jsonp('http://www.valetcleaning.com/vclip/user.php?callback=JSON_CALLBACK&action=confirm&user_id=' + newUser.email + '&user_pwd=' + newUser.password + '&code=' + newUser.activationCode);
        }
    }
});