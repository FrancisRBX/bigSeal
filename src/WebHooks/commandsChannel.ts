import { TextChannel } from "discord.js";
import * as Client from "../client";
import { guildID } from './index';
import { Chat } from "../routes/chats";

const channelID = '1103973541340266515';

export async function sendMessage(packet : Chat) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);
    console.log("Guild: " + guild);
    if (guild) {

        var stringBuilder = '';
        
        stringBuilder = '**' + packet.playerName + '**' + ' chatted: **' + packet.message + '**';

        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;

        channel?.send(stringBuilder);
    }
}