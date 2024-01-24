import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, RBLX_COOKIE } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error('Missing environmental variables');
}

if (!RBLX_COOKIE) {
  throw console.warn('Missing RBLX Cookie');
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  RBLX_COOKIE
};