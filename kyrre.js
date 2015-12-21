var rp = require('request-promise');
function Depop () {
   this.accessToken = undefined;
   this.follow_url = undefined;
    this.headers = {
            'User-Agent': 'Depop 1.11 rv:7984 (iPhone; iPhone OS 9.2; nb_NO)',
            'X-Garage-bundle-id': 'com.garageitaly.garage'
    };
    this.login = function(username, password) {

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
                that.accessToken = data.access_token;                
                return response;
            })
            .catch(function(err) {
                console.log(err);
            })
    };
    this.getFollowUrl = function(username, password) {
        var that = this;
        var data = that.login(username, password);

        return 
        data.then(function(dict) {
            var second_user_id = '2994209'
            follow_url = 'https://api.garage.me/api/v1/users/%s/following/?user_id=%s';
            follow_url = follow_url.replace('%s', dict.user_id); 
            follow_url = follow_url.replace('%s', second_user_id);
            console.log("inside getFollowUrl:");
            console.log(follow_url);
            return follow_url;
        })
        .catch(function(err) {
            console.log("fail getFollowUrl");
        })
/*
{"user_id": 2994212, "username": "kyrre", "token_type": "Bearer", 
"expires_in": 30640372, "refresh_token": "2c5eba732c3f9c464db891f4abdf723bad4717a3", 
"access_token": "a938a0135a0db22d67a8e238e07619f5ed7350f2", "scope": "read"}
*/
    };
    return this;
};


var client = new Depop();
var result = client.login("kyrre", "hehheh");
var url = client.getFollowUrl("kyrre", "hehheh");

result.then(function(response) {
    console.log("------");
    console.log(client.accessToken);
});

url.then(function(repos) {
    console.log("follow url: ");
    console.log(repos);
});


