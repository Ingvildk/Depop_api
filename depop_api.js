var rp = require('request-promise');
//create the Deopop class which has all the methods and variables
var options = {
      uri: 'https://api.garage.me/oauth2/access_token?',
      headers: {
          'User-Agent': 'Depop 1.11 rv:7984 (iPhone; iPhone OS 9.2; nb_NO)',
          'X-Garage-bundle-id': 'com.garageitaly.garage'
      },
      form: {
         'username': 'kyrre',
         'password': 'hehheh',
         'grant_type': 'password',
         'client_id': '09578a881810c82289e5',
         'client_secret': '8ae9346e8c3b560320dc5ba9cb10d1286b4e4a98'
	     },
	     method: 'POST'
	 }
function Depop () {

	this.getFollowUrl = function() {
		rp(options)
			.then(function(htmlString) {		
				var myObject = JSON.parse(htmlString);
		 		var second_user_id = '2994209'
		 		options.headers['Authorization']= 'Bearer ' + myObject.access_token;
				var follow_url = 'https://api.garage.me/api/v1/users/%s/following/?user_id=%s';
		 		follow_url = follow_url.replace('%s', myObject.user_id, second_user_id); 
		 		follow_url = follow_url.replace('%s', second_user_id); //follow_url have the parameters at the right place
		     	return follow_url;		 					
			})
			.catch(function(err) {
				console.log('FAIL');
				console.log(err);
			})
		};    	
	
	};


var object = new Depop();
var result = object.getFollowUrl();
console.log(result);
//console.log("----");
//console.log(yo);
