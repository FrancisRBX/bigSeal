import { TextChannel } from "discord.js";
import * as Client from "../client";
import { guildID } from './index';

const channelID = '1103973541340266515';

export async function sendMessage(packet : any) {
    const client = Client.client;
    const guild = client.guilds.cache.get(guildID);
    console.log("Guild: " + guild);
    if (guild) {

        var stringBuilder = '';

        
        stringBuilder = '**' + packet.player + '**' + ' has used command: **' + packet.command + '**' + ' with message: **' + packet.message + '**';

        const channel: TextChannel = guild.channels.cache.get(channelID) as TextChannel;

        channel?.send(stringBuilder);

    }

}