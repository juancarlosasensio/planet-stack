"use strict";

const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');

const ytChannelTitles = ['CBS Sports Golazo', 'ESPN FC']

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
    key: process.env.YT_API_KEY,
    q: encodeURIComponent('real madrid vs shaktar donetsk'),
    maxResults: 3,
    order: 'relevance'
  });
  
  const data = await res.data;
  const filteredItems = data.items.filter(item => {
    return ytChannelTitles.includes(item.snippet.channelTitle)
  })

  const videoIds = filteredItems.map(item => item.id.videoId );
  return [...videoIds]
};