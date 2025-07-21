const { TwitterApi } = require('twitter-api-v2');

// === 這裡填入最新的 API 金鑰 ===
const client = new TwitterApi({
  appKey: 'pqhZiHNokVlWoqYjNbRe4OJYW',
  appSecret: '0vXkTfdrDdNKd9BA660841uHo7DxdKQbq7jjTsQf3d32H4DQDK',
  accessToken: '1947113080024109056-XCJkKOtMuJ3hcrLe33pbFyh75QbGKi',
  accessSecret: 'vYvVgM1KVh4lFOlBYJiwJl4zvkoulnXgKTwjPoFoDorFa'
});

// === 詞庫 ===
const messages = [
  "🚀 KOM forever!",
  "💥 Another day, another meme!",
  "🔥 KOM daily update!",
  "😎 Meme coins never sleep. Neither do we.",
  "👑 King of Meme here. Bow down!",
  "⚡️ Your financial advisor warned you about this tweet.",
  "🐸 Frog season is over. KOM season begins!",
  "🛸 Forget fundamentals. KOM is pure meme magic.",
  "💎 HODL... or not? I don't care. KOM forever!",
  "When in doubt, just buy more KOM."
];

// === 隨機挑一條發文 ===
const randomMessage = messages[Math.floor(Math.random() * messages.length)];

(async () => {
  try {
    const tweet = await client.v2.tweet(randomMessage);
    console.log(`✅ Tweet 成功！Tweet ID: ${tweet.data.id}`);
  } catch (error) {
    console.error('❌ 發文失敗:', error);
  }
})();

