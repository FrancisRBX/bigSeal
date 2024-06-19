import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { routes } from "../routesOLD";

export const data = new SlashCommandBuilder()
    .setName('getplaceavailability')
    .setDescription('Replies if a certain roblox place is public or private')
    .addStringOption(option => option
        .setName('placeid')
        .setDescription('The roblox place ID')
        .setRequired(true));

export async function execute(interaction: CommandInteraction) {
    const placeID = interaction.options.get('placeid')?.value as string;

    const placeStatus = await routes.robloxRoutes.getPlaceAvailability(placeID);
    console.log(placeStatus);
    if (placeStatus === undefined) {
        await interaction.reply('Failed to get place status');
        return;
    } else if (placeStatus === true) {
        await interaction.reply('This place is public https://www.roblox.com/games/' + placeID);
    } else if (placeStatus === false) {
        await interaction.reply('This place is private https://www.roblox.com/games/' + placeID);
    }
}