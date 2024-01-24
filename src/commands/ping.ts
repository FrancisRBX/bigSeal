import { SlashCommandBuilder, CommandInteraction } from "discord.js";


export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction : CommandInteraction) {
    console.log(interaction.toJSON());
    await interaction.reply('Pong!');
}