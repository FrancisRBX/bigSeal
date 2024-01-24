import { Client, Collection, Events } from 'discord.js';

export const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});