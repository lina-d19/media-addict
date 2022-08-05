const PORT = Number(process.env["PORT"]) || 8000 
const express = require('express')
const cors = require('cors')
const {TwitterApi} = require('twitter-api-v2')
const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
const snoowrap = require('snoowrap')
const linkPreviewGenerator = require('link-preview-generator')
const spotify = require('spotify-web-api-node')
const fetch = require('node-fetch')
var request = require('request')

const app = express()
app.use(cors())


app.get('/s', async (req, res) => {

    const client = new TwitterApi(process.env.twt_bearer_token)

    const trendsInternational = await client.v1.trendsByPlace(1);

    const trendList = []

    for (const {trends} of trendsInternational) {
        for (const trend of trends) {
            trendList.push({
                name: trend.name,
                url: trend.url
            })
        }
    }

    res.json(trendList)
})



app.get('/reddits', async (req, res) => {
    const r = new snoowrap({
        userAgent: process.env.user_agent,
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token
    })

    topPosts = []
    
    ;(await r.getHot()).forEach(post => {
        topPosts.push({
            title: post.title,
            url: post.url
        })
    })
    
    res.json(topPosts);

})

/*
app.get('/spotify', async (req, res) => {
    spotifyClientId = process.env.sClientId
    spotifySecret = process.env.sClientSecret

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(spotifyClientId + ':' + spotifySecret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const token = body.access_token;
        }
      });

    fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF/tracks", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.userAccessToken}`,
            "Content-type": "application/json"
        }
    }).
    then(response => response.json())
})
*/

app.get('/newss', async (req, res) => {
    const news_url = 'https://www.theguardian.com/international'

    axios(news_url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        const values = new Set();

        $('.fc-item__title', html).each(function () { //<-- cannot be a function expression

            const title = $(this).text().trim();
            const url = $(this).find('a').attr('href');

            if (!values.has(url)) {

              values.add(url);

              articles.push({
                  title,
                  url
              });
            }  
        })
        res.json(articles)
    }).catch(err => console.log(err))


})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))