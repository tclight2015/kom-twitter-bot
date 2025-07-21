require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.API_Key,
  appSecret: process.env.API_Key_Secret,
  accessToken: process.env.Access_Token,
  accessSecret: process.env.Access_Token_Secret,
});

const messages = [
  "🔥 HODL... or not? I don't care. KOM forever!",
  "😎 Meme coins never sleep. Neither do we.",
  "🚀 King of Meme here. Bow down!",
  "⚡ The market is chaos... just how we like it.",
  "💎 When in doubt, just buy more KOM.",
  "🤣 Serious traders hate us, but we love memes.",
  "🦍 Another day, another meme. KOM lives on!",
  "⚠️ Your financial advisor warned you about this tweet.",
  "🐸 Frog season is over. KOM season begins!",
  "🕶️ Buying KOM is a lifestyle, not an investment.",
  "😂 Laugh your way to the moon 🌕 with KOM!",
  "🔔 Forget fundamentals. KOM is pure meme magic."
];

async function postRandomTweet() {
  try {
    const message = messages[Math.floor(Math.random() * messages.length)];
    const tweet = await client.v2.tweet(message);
    console.log(`✅ Tweet 發送成功！Tweet ID: ${tweet.data.id}`);
  } catch (error) {
    console.error('❌ 發文失敗：', error);
  }
}

postRandomTweet();