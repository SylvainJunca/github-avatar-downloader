var request = require('request');

const key = require('./secret');


console.log('Welcome to the GitHub Avatar Downloader!');

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
  
  