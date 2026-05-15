import { TextChannel } from "discord.js";
import * as Client from "../client";
import { guildID } from './index';

const channelID = "1504515371808587877";

interface DeathPacket {
    placeName: string;
    loreName: string;
    playerName: string;
    playerID: string;
}

interface PDPacket {
    placeName: string;
}

export async function logPDStart(packet: PDPacket) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);

    if (guild) {
        const stringBuilder = `PD Started at: **${packet.placeName}**`;
        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;

        channel?.send(stringBuilder);
    }
}

export async function logPDEnd(packet: PDPacket) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);

    if (guild) {
        const stringBuilder = `PD Ended at: **${packet.placeName}**`;
        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;

        channel?.send(stringBuilder);
    }
}

export async function logPlayerDeath(packet: DeathPacket) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);

    if (guild) {
        const stringBuilder = `Player **${packet.loreName}** (**${packet.playerName}** - **${packet.playerID}**) died at: **${packet.placeName}**`;
        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;
        channel?.send(stringBuilder);
    }
}



