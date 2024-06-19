import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import { routes } from "../routesOLD";

export const data = new SlashCommandBuilder()
  .setName('getpwdata')
  .setDescription('Gets a certain roblox player\'s info');

export async function execute(interaction: CommandInteraction) {
  
  const pwData = await routes.robloxRoutes.getPWData();

  console.log(pwData);
  
  await interaction.reply("Got it.");
}