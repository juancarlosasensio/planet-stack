const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const { YT_API_KEY } = process.env

module.exports = async () => {


// initialize the Youtube API library
const youtube = google.youtube('v3');

// a very simple example of searching for youtube videos
  // const auth = await authenticate({
  //   keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
  //   scopes: ['https://www.googleapis.com/auth/youtube'],
  // });
  // google.options({auth});

  const res = await youtube.search.list({
    part: 'snippet',
    key: YT_API_KEY,
    q: encodeURIComponent('real madrid vs shaktar donetsk'),
    maxResults: 10

  });

  const data = await res.data;

  const videoIds = data.items.map(item => item.id.videoId)

  return [...videoIds]
}