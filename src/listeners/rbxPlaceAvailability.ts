import { TextChannel } from "discord.js";
import { routes } from "../routes";
import * as Client from "../client";

// guildID : 918930587723653211
// channelID : 918930587723653214

async function execute() {
    const client = Client.client;

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10000 milliseconds (10 second)

        const guild = client.guilds.cache.get('918930587723653211');
        if (guild) {

            const channel = guild.channels.cache.get('918930587723653214') as TextChannel;
            const placeStatus = await routes.robloxRoutes.getPlaceAvailability('15619487220');

            if (placeStatus === undefined) {
                console.log('Failed to get place status');
            } else if (placeStatus === true) {
                channel?.send('@here \nThis place is public https://www.roblox.com/games/15619487220');
            }
        }
    }
}

execute();