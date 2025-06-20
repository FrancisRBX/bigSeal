import { Request, Response } from 'express';
import { Router } from 'express';
import { discordToRobloxMap, robloxToDiscordMap } from '../commands/link';
import { client } from '../client';

export const pdDeathRoute = Router();

const guildID = '918930587723653211';

pdDeathRoute.route('/PD_death')
    .post(async (req: Request, res: Response) => {
        console.log(req.body);
        const robloxId = req.body.playerId.toString();

        console.log(robloxToDiscordMap, discordToRobloxMap);
        const discordUserId = robloxToDiscordMap.get(robloxId);
        if (!discordUserId) {
            console.log(`No D+iscord user found for Roblox ID: ${robloxId}`);
            return res.status(404).json({ error: 'Discord user not found for the provided Roblox ID.' });
        }
        console.log(`Discord user ID for Roblox ID ${robloxId}: ${discordUserId}`);

        const guild = await client.guilds.fetch(guildID);
        const user = await guild?.members.fetch(discordUserId);

        if (!user) {
            console.log(`No user found in guild for Discord ID: ${discordUserId}`);
            return res.status(404).json({ error: 'User not found in the guild.' });
        }

        try {
            user.timeout(5 * 60 * 1000, 'You died....');
            res.status(201);
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            return res.status(500).json({ error: 'Internal server error while fetching user.' });
        }

    });