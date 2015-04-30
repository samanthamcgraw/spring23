var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("Every man is a creature of the age in which he lives and few are able to raise themselves above the ideas of the time.");
quotes.push("You are never too old to set another goal, or to dream a new dream");
quotes.push("We make a living by what we get, but we make a life by what we give");
quotes.push("The pure and simple truth is rarely pure and never simple");
quotes.push("Who controls the past controls the future, who controls the present controls the past");

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Sample',
                subtitle: 'Spring 23',
                content: theText
            },
            shouldEndSession: 'false'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            if (jsonString.length > 0)
                console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(3004); //Put number in the 3000 range for testing and 443 for production
