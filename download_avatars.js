var request = require('request');
var fs = require("fs");

const key = require('./secret');


console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  request.get(url)               // Note 1
  .on('error', function (err) {                                   // Note 2
  throw err;
  })
  .pipe(fs.createWriteStream(filePath)); 

}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = { 
    Authorization: "token " + key,
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
      if (err) {
          console.error(err);
      };
    const content = JSON.parse(body);
    for(var each of content) {
    console.log(each['avatar_url']);
    }
  });
}
getRepoContributors('jquery', 'jquery');
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
  
  