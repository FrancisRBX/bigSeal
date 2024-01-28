import * as setClient from './client';
import { deployCommands } from './deployCommands';
import { commands } from './commands';
import { config } from './config';
import './listeners';
import './express';

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
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);