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

async function postTweetWithRandomImage() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];

    // 讀取 assets 資料夾內所有圖片檔名
    const imagesDir = path.join(__dirname, 'assets');
    const files = fs.readdirSync(imagesDir).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    if (files.length === 0) {
      console.error('❌ 沒有找到圖片檔案');
      return;
    }

    // 隨機挑一張圖片
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
