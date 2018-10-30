var request = require('request');
var fs = require("fs");

const key = require('./secret');
const argv = process.argv.slice(2);

// This function gets url to download the avatar to the specified file path
function downloadImageByURL(url, filePath) {
  request.get(url)              
  .on('error', function (err) {                                  
  throw err;
  })
  .pipe(fs.createWriteStream(filePath)); 
};

// This is the main function. It uses the GitHub API with a private Key in order
// to get the data related to the owners and repository name specified
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

//We verify the user passed 2 arguments in the CLI to make sure they use the app properly
if (argv.length !== 2) {
  console.error(`Please specify which repoOwner and repoName you want to download avatars.\n
  Example : node download_avatars.js <owner> <repo>\n`);
  process.exit();
}
// Because we are very polite people, we welcome everybody that uses this app correctly
console.log('Welcome to the GitHub Avatar Downloader!');


// We are calling the main function, it takes the 2 arguments we got via the CLI and uses
// a callback function to loop through the api and gets the url and names we need
getRepoContributors(argv[0], argv[1], function(content) {
  for (var each of content) {
    downloadImageByURL(each['avatar_url'], `./avatars/${each.login}.jpg`);
  }
});