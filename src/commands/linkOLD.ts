import { SlashCommandBuilder, ChatInputCommandInteraction, Message, MessageFlags } from "discord.js";

export const robloxToDiscordMap = new Map<string, string>();
export const discordToRobloxMap = new Map<string, string>();
const pendingLinks = new Map<string, string>();

function isRobloxId(str: string): boolean {
    return /^\d+$/.test(str);
}

async function startLinking(interaction: ChatInputCommandInteraction, robloxId: string) {
    const discordId = interaction.user.id;

    if (robloxToDiscordMap.has(robloxId)) {
        return await interaction.reply({ content: '❌ This Roblox ID is already linked to another Discord account.', flags: MessageFlags.Ephemeral });
    }

    const code = Math.random().toString(36).substring(2, 6).toUpperCase();

    pendingLinks.set(robloxId, code);

    await interaction.reply({
        content: `🔗 To verify your Roblox account **${robloxId}**, do the following:\n\n` +
            `1. Go to [your Roblox profile](https://www.roblox.com/users/` + robloxId + `/profile) and paste this code into your bio/blurb:\n\n` +
            `\`${code}\`\n\n` +
            `2. Then run the command \`/link ${robloxId}\` to complete linking.`,
        flags: MessageFlags.Ephemeral
    });

}

async function finishLinking(interaction: ChatInputCommandInteraction, robloxId: string) {
    const discordId = interaction.user.id;


    if (robloxToDiscordMap.get(robloxId)) {
        return await interaction.reply({ content: '❌ This Roblox ID is already linked to another Discord account.', flags: MessageFlags.Ephemeral });
    }

    const expectedCode = pendingLinks.get(robloxId);
    if (!expectedCode) {
        return await interaction.reply({ content: '❌ No pending verification found. Please use `/link` first.', flags: MessageFlags.Ephemeral });
    }

    try {
        const userRes = await fetch(`https://users.roblox.com/v1/users/` + robloxId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const userData = await userRes.json();
        const description = userData.description || '';

        const found = description.includes(expectedCode);
        if (!found) {
            return interaction.reply({ content: "❌ Code not found in bio. Please add it to your Roblox profile and try again.", ephemeral: true });
        }

    } catch (error) {

    }

    robloxToDiscordMap.set(robloxId, discordId);
    discordToRobloxMap.set(discordId, robloxId);
    pendingLinks.delete(robloxId);

    await interaction.reply({
        content: `✅ Successfully linked your Roblox account **${robloxId}** to your Discord account!`,
        flags: MessageFlags.Ephemeral
    });

}

export const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link your Roblox account to your Discord account')
    .addStringOption(option =>
        option.setName('roblox_id')
            .setDescription('Your Roblox ID')
            .setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
    const robloxId = interaction.options.getString('roblox_id');

    if (!robloxId || !isRobloxId(robloxId)) {
        await interaction.reply({ content: 'Please provide a valid Roblox ID and try again.', flags: MessageFlags.Ephemeral });
        return;
    }

    if (!pendingLinks.has(robloxId)) {
        await startLinking(interaction, robloxId);
        return;

    } else {
        finishLinking(interaction, robloxId);
    }
}