import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, RBLX_COOKIE, RLX_API_KEY, BACK_PORT, BOT_SECRET } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error('Missing environmental variables');
}

if (!RLX_API_KEY) {
  throw console.warn('Missing RLX API Key, some features may not work');
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  RBLX_COOKIE,
  RLX_API_KEY,
  BACK_PORT : Number(BACK_PORT),
  BOT_SECRET
};