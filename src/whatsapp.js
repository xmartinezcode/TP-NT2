var request = require('request'); //bash: npm install request
// URL for request POST /message
var url = 'https://eu41.chat-api.com/instance75761/sendMessage?token=4wthjoyfe3s1yywh';
var data = {
    phone: '5491136334893', // Receivers phone
    body: 'Hello, world!', // Message
};
// Send a request
request({
    url: url,
    method: "POST",
    json: data
});