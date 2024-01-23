"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('All Environmental Variables:', process.env);
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
console.log('DISCORD_TOKEN:', DISCORD_TOKEN);
console.log('DISCORD_CLIENT_ID:', DISCORD_CLIENT_ID);
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    throw new Error('Missing environmental variables');
}
exports.config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
};
