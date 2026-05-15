import { SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { config } from '../config';

const GROUP_ID = 14326849;
const API_KEY = config.RLX_API_KEY;
const ACCEPTANCE_ROLE_ID = "1504460005657677905"; 

async function resolveUsername(username: string): Promise<number | null> {
    const res = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
    });
    const data = await res.json();
    return data.data?.[0]?.id ?? null;
}

async function isPendingInGroup(userId: number): Promise<boolean> {
    const res = await fetch(
        `https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/join-requests?filter=user == 'users/${userId}'`,
        {
            headers: { "x-api-key": API_KEY },
        }
    );
    const data = await res.json();
    console.log(data);
    return (data.groupJoinRequests?.length ?? 0) > 0;
}

async function acceptPlayer(userId: number): Promise<boolean> {
    const res = await fetch(
        `https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/join-requests/${userId}:accept`,
        {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        }
    );
    const data = await res.json();
    console.log("Accept response:", data);
    return res.ok;
}

export const data = new SlashCommandBuilder()
    .setName('accept')
    .setDescription('Accepts a player through their roblox user name.')
    .addStringOption((option) => 
        option
    .setName('input')
    .setDescription('The player name to be accepted in the group')
    .setRequired(true)
);

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const member = interaction.member as GuildMember;
    if (!member.roles.cache.has(ACCEPTANCE_ROLE_ID)) {
        return interaction.editReply("❌ You don't have permission to use this command.");
    }

    const username = interaction.options.getString("input", true);

    try {
        const userId = await resolveUsername(username);
        if (!userId) {
            return interaction.editReply(`❌ No Roblox user found with the name **${username}**.`);
        }

        const pending = await isPendingInGroup(userId);
        if (!pending) {
            return interaction.editReply(`❌ **${username}** does not have a pending join request.`);
        }

        const accepted = await acceptPlayer(userId);
        if (accepted) {
            return interaction.editReply(`✅ **${username}** has been accepted into the group!`);
        } else {
            return interaction.editReply(`❌ Failed to accept **${username}**. Check your API key permissions.`);
        }
    } catch (err) {
        console.error(err);
        return interaction.editReply("❌ An unexpected error occurred.");
    }

    await interaction.reply(`Command ran successfully!`);
}