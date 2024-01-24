import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info');

export async function execute(interaction: CommandInteraction) {
    await interaction.reply(`This command was ran by: ${interaction.user.displayName}\nYour tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
}