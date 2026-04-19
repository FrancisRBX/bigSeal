import * as setClient from './client';
import { deployCommands } from './deployCommands';
import { commands } from './commands';
import { config } from './config';
import './listeners';

const client = setClient.client;

client.once('ready', () => {
    console.log("Discord bot is ready! 🤖");

    client.guilds.cache.forEach(async (guild) => {
        await deployCommands({ guildId: guild.id });
    });
});

client.on('guildCreate', async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);

import './express'; // Start the express server