var rp = require('request-promise');

function Depop () {
    this.accessToken = undefined;
    this.headers = {
            'User-Agent': 'Depop 1.11 rv:7984 (iPhone; iPhone OS 9.2; nb_NO)',
            'X-Garage-bundle-id': 'com.garageitaly.garage'
    };
    this.login = function(username, password) {
        console.log('---- login ----');
        var that = this;
        var options = {
            headers: this.headers,
            uri: 'https://api.garage.me/oauth2/access_token?',
            form: {
                'username': username,
                'password': password,
                'grant_type': 'password',
                'client_id': '09578a881810c82289e5',
                'client_secret': '8ae9346e8c3b560320dc5ba9cb10d1286b4e4a98'
            },
            method: 'POST'
        }
        return rp(options)
            .then(function(response) {
                var data = JSON.parse(response);          
                return data;
            })
            .catch(function(err) {
                console.log(err);
            })
    };

    this.getFollowersList = function(userId, secondUserId) {
        console.log("---- getFollowersList ----");
        var that = this;
        var uri = `https://api.garage.me/api/v1/users/${userId}/following/?user_id=${secondUserId}`;
        var options = {
            headers: this.headers,
            uri: uri,
            method: 'GET'
        }

        return rp(options)
            .then((response) => {
                return JSON.parse(response);    
            })
    };


    this.followUser = function(userId, secondUserId) {
        var that = this;

        var uri = `https://api/v1/users/${userId}/following/?user_id=${secondUserId}`;
        var options = {

            headers: this.headers,
            uri: uri,
            method: 'PUT'
        }

        return rp(options).then((response) => {
            return response;
        })

    };
       
};

module.exports = Depop;

var client = new Depop();
var result = client.login("kyrre", "hehheh");
result.then((resposne) => {client.getFollowersList(2994209,2994212); })
/*
var result = client.followUser(2994209, 2922799);

result.then(function(respone) {
    console.log(response);
});
*/
