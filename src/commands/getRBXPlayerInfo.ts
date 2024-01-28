import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import { routes } from "../routes";

export const data = new SlashCommandBuilder()
  .setName('getrbxplayerinfo')
  .setDescription('Gets a certain roblox player\'s info')
  .addStringOption(option => option
    .setName('profileid')
    .setDescription('The roblox profile ID')
    .setRequired(true));

export async function execute(interaction: CommandInteraction) {
  
  const profileID = interaction.options.get('profileid')?.value as string;
  const profileInfo = await routes.robloxRoutes.getRobloxProfile(profileID);
  const headShotURL = await routes.robloxRoutes.getRobloxProfileHeadshot(profileID);

  const embed = new EmbedBuilder()
    .setTitle(`${profileInfo.name}'s Profile Information`)
    .setURL(`https://www.roblox.com/users/${profileInfo.id}/profile`)
    .setThumbnail(headShotURL)
    .setDescription(`
    **Username:** ${profileInfo.name}
    **Display Name:** ${profileInfo.displayName}
    **Profile ID:** ${profileInfo.id}
    `) // Add more fields as needed
    .setColor('#0099ff'); // You can change the color as needed

  await interaction.reply({ embeds: [embed] });
}