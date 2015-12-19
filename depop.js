var rp = require('request-promise');

/*
var url = "https://api.garage.me/oauth2/access_token?";

rp({ url:url, json:true })
  .then(function (data) {
    console.log("%s@%s: %s", data.name, data.version, data.description);
  })
  .catch(function (reason) {
    console.error("%s; %s", reason.error.message, reason.options.url);
    console.log("%j", reason.response.statusCode);
  });
*/
  
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
 
         
 rp(options)
     .then(function(htmlString) {
 		 console.log('success');
 		 //change string to dictionary
 		 var myObject = JSON.parse(htmlString);
 		 var second_user_id = '2994209'


 		 options.headers['Authorization']= 'Bearer ' + myObject.access_token;
 		 var follow_url = 'https://api.garage.me/api/v1/users/%s/following/?user_id=%s';
 		 follow_url = follow_url.replace('%s', myObject.user_id, second_user_id); 
 		 follow_url = follow_url.replace('%s', second_user_id); //follow_url have the parameters at the right place

 		 var options_two = {
 		 	uri: follow_url,
 		 	headers:  options.headers
 		 }
 		 return follow
 		 //var response = rp.put(follow_url,headers=headers);
 		 rp(options_two) 
 		 	.then(function(htmlString_two) {
 		 		console.log('THANK GOD PUT IS WORKING');
 		 		var my_followers_url = 'https://api.garage.me/api/v1/users/%s/followers/?limit=50&offset=0'; // % user_profile['user_id']
 		 		my_followers_url = my_followers_url.replace('%s', myObject.user_id);
 		 		var options_get = {
 		 			uri: my_followers_url,
 		 			headers: options.headers
 		 		}
 		 		rp(options_get)
 		 		  .then(function(repos) {
 		 		  	console.log('get success');
 		 		  	//change repos string to dictionary
 		 		  	var myFollowers = JSON.parse(repos);
 		 		  	console.log(myFollowers.objects);
 		 		  	//repos contains a lot of data dictionary
 		 		  	/*for (var i = 0; i < repos.lenght; i++) {
 		 		  		console.log(repos[i])
 		 		  	}*/
 		 		  })
 		 		  .catch(function(err_three) {
 		 		  	console.log('get error')
 		 		  }) 
 		 		//response = s.get(my_followers_url, headers=headers)
 		 	})
 		 	.catch(function(err_two) {
 		 		console.log('put error');
 		 	})

     })
     .catch(function(err) {
         console.log('fail :)');
         console.log(err)
         //crawling failed..
     });
/*
var options_two = {
	console.log(follow_url);
}
*/
//console.log(follow_url);     
