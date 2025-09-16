// SimplePaperTrader - beginner-friendly simulated trading bot
// Behavior:
// 1) Simulates fetching a random crypto price every 5 seconds
// 2) If price is even -> BUY, if odd -> SELL
// 3) Logs price and action to the console
// 4) Reads API_KEY and BOT_NAME from environment variables and logs them at startup
// 5) Exports startBot() so the bot can be started with `node index.js`

// Attempt to load dotenv if present (optional). This allows using a .env file locally.
try {
  require("dotenv").config();
} catch (err) {
  // dotenv not installed — it's optional for this simple demo
}

const API_KEY = process.env.API_KEY || "";
const BOT_NAME = process.env.BOT_NAME || "SimplePaperTrader";

let intervalId = null;

function getRandomPrice() {
  // Simulate a crypto price as an integer between 10000 and 60000
  return Math.floor(Math.random() * 50001) + 10000;
}

function decideAction(price) {
  // Basic strategy: if price is even -> BUY, if odd -> SELL
  return price % 2 === 0 ? "BUY" : "SELL";
}

function logStatus(price, action) {
  const time = new Date().toISOString();
  console.log(`[${time}] Price: ${price} | Action: ${action}`);
}

function startBot(intervalMs = 5000) {
  if (intervalId) {
    console.log("Bot is already running.");
    return;
  }

  console.log("Starting trading bot...");
  console.log(`BOT_NAME: ${BOT_NAME}`);
  console.log(`API_KEY: ${API_KEY}`);
  console.log("---");

  // Run immediately once, then every intervalMs
  const runOnce = () => {
    const price = getRandomPrice();
    const action = decideAction(price);
    logStatus(price, action);
  };

  runOnce();
  intervalId = setInterval(runOnce, intervalMs);

  // Return a small API so the caller can stop the bot if they want
  return {
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Bot stopped.");
      }
    },
  };
}

module.exports = { startBot };

// If the file is run directly, start the bot
if (require.main === module) {
  startBot();
}
