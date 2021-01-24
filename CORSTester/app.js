var corsTesterLib = require('cors-tester');
//Full return values, with errors and responses


const url = 'https://measuring.gg/api/users/currentuser';

corsTesterLib.makeCorsRequest('https://measuring.gg', function(returnValue) {
  console.log(returnValue);
});

//OR a very simplified response
corsTesterLib.simpleTest('https://measuring.gg', function(returnValue) {
  console.log(returnValue);
});

//These will make a GET request from Origin: http://localhost:4006 to the specified url
//Which means that the server should return proper Access-Control headers allowing http://localhost:4006 to access

// The first parameter can also be an object with the following variables
var config = {
  port: 4447, //Default=4006
  url: 'https://measuring.gg',
  method: 'GET' //Default="GET"
};
corsTesterLib.simpleTest(config, function(returnValue) {
  console.log(returnValue);
});