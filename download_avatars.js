var request = require('request');
var fs = require("fs");

const key = require('./secret');
const argv = process.argv.slice(2);


console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath) {
  request.get(url)              
  .on('error', function (err) {                                  
  throw err;
  })
  .pipe(fs.createWriteStream(filePath)); 

}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = { 
    Authorization: "token " + key,
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
    'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
      if (err) {
          console.error(err);
      };
    const content = JSON.parse(body);
    cb(content);
    
  });
}
getRepoContributors(argv[0], argv[1], function(content) {
    for(var each of content) {
        downloadImageByURL(each['avatar_url'], `./avatars/${each.login}.jpg`);
        }
});