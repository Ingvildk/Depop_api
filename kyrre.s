var rp = require('request-promise');
​
function Depop() {
​
    this.accessToken = undefined;
    this.headers = {
            'User-Agent': 'Depop 1.11 rv:7984 (iPhone; iPhone OS 9.2; nb_NO)',
            'X-Garage-bundle-id': 'com.garageitaly.garage'
    };
​
    this.login = function(username, password) {
​
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
​
        return rp(options)
            .then(function(response) {
                var data = JSON.parse(response);
                that.accessToken = data.access_token;
​
​
                return {status: "success"}
            })
            .catch(function(err) {
                console.log(err);
            })
    }
​
    return this;
};
​
​
var client = new Depop();
var result = client.login("kyrre", "hehheh")
​
​
result.then(function(response) {
    console.log(client.accessToken);
});