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

// 外部 messages.json
const messages = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages.json'), 'utf-8'));

// 預設 hashtag 池
const hashtags = ['#KOM', '#KingOfMeme', '#MemeCoin', '#Crypto', '#TrumpMeme', '#MakeMemesGreatAgain'];

// 追蹤這些 target keywords
const targetKeywords = ['Trump', 'Crypto', 'Meme', 'Election', 'BTC', 'Bitcoin'];

// 隨機 hashtag 工具
function getRandomHashtags() {
  const shuffled = hashtags.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3) + 1; // 1~3 個 hashtag
  return shuffled.slice(0, count).join(' ');
}

// 抓 trending 並判斷是否包含 target keywords
async function getTrendingHashtags() {
  try {
    const trends = await client.v1.trendsByPlace(1); // 全球 trending topics
    const trendNames = trends[0].trends.map(t => t.name.toLowerCase());
    const matchedKeywords = targetKeywords.filter(keyword =>
      trendNames.some(trend => trend.includes(keyword.toLowerCase()))
    );

    if (matchedKeywords.length > 0) {
      console.log(`✅ Trending match found: ${matchedKeywords.join(', ')}`);
      return matchedKeywords.map(k => `#${k}`).join(' ');
    } else {
      return getRandomHashtags();
    }
  } catch (error) {
    console.error('⚠️ Failed to fetch trends. Fallback to random hashtags.', error);
    return getRandomHashtags();
  }
}

async function postTweetWithRandomImage() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const hashtagString = await getTrendingHashtags();
    const fullMessage = `${message} ${hashtagString}`;

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
      text: fullMessage,
      media: { media_ids: [mediaId] },
    });

    console.log(`✅ Tweet sent successfully! Tweet ID: ${tweet.data.id}`);
  } catch (error) {
    console.error('❌ Tweet failed:', error);
  }
}

postTweetWithRandomImage();
