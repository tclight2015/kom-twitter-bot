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

// 👇 改這裡，讀取外部 messages.json
const messages = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages.json'), 'utf-8'));

async function postTweetWithRandomImage() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];

    const imagesDir = path.join(__dirname, 'assets');
    const files = fs.readdirSync(imagesDir).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    if (files.length === 0) {
      console.error('❌ 沒有找到圖片檔案');
      return;
    }

    const randomImage = files[Math.floor(Math.random() * files.length)];
    const imagePath = path.join(imagesDir, randomImage);

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

postTweetWithRandomImage();
