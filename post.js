require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

const client = new TwitterApi({
  appKey: process.env.API_Key,
  appSecret: process.env.API_Key_Secret,
  accessToken: process.env.Access_Token,
  accessSecret: process.env.Access_Token_Secret,
});

const messages = [
  "🔥 KOM forever! Meme magic is real.",
  "🤣 Laugh your way to the moon 🌕 with KOM!",
  "🚀 King of Meme strikes again!",
  "🕶️ Meme lifestyle = KOM lifestyle.",
  "😂 KOM = Chaos On Memes!"
];

const imagePath = path.join(__dirname, 'assets', 'kom-meme.jpg');

async function postTweetWithImage() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const mediaId = await client.v1.uploadMedia(imagePath);
    const tweet = await client.v2.tweet({
      text: message,
      media: { media_ids: [mediaId] },
    });
    console.log(`✅ Tweet sent successfully! Tweet ID: ${tweet.data.id}`);
  } catch (error) {
    console.error('❌ Tweet failed:', error);
  }
}

postTweetWithImage();
