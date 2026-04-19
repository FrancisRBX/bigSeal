import { TextChannel } from "discord.js";
import * as Client from "../client";
import { guildID } from './index';

const channelID = '1351246417988943912';

export async function sendMessage(packet: any) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);
    console.log("Guild: " + guild);
    if (guild) {

        let stringBuilder = '';

        stringBuilder = '**' + packet.playerName + '**' + ' chatted: **' + packet.message + '**';

        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;

        channel?.send(stringBuilder);

    }

}