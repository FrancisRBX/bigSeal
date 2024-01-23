"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const deployCommands_1 = require("./deployCommands");
const commands_1 = require("./commands/commands");
const config_1 = require("./config");
const client = new discord_js_1.Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});
client.once('ready', () => {
    console.log("Discord bot is ready! 🤖");
});
client.on('guildCreate', async (guild) => {
    await (0, deployCommands_1.deployCommands)({ guildId: guild.id });
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    if (commands_1.commands[commandName]) {
        commands_1.commands[commandName].execute(interaction);
    }
});
client.login(config_1.config.DISCORD_TOKEN);
