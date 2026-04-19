import { SlashCommandBuilder, ChatInputCommandInteraction, Message, MessageFlags } from "discord.js";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const LINK_AUTH_KEY = process.env.LINK_AUTH_KEY

export const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link your Roblox account to your Discord account');

export async function execute(interaction: ChatInputCommandInteraction) {
    const robloxId = interaction.options.getString('roblox_id');

    console.log(interaction);

    const discordId = interaction.user.id;

    axios.get(`https://vr3.dev/api/info/${discordId}`, {
        headers: {
            'Authorization': LINK_AUTH_KEY
        }
    })
        .then(response => {
            if (response.data.verified) {
                interaction.reply({ content: 'You are already verified. Run /reverify if you wish to relink your account.', ephemeral: true });
            } else {
                const uniqueID = uuidv4();
                axios.post('https://vr3.dev/api/verify', { discordId, displayName: interaction.user.displayName, uniqueID }, {
                    headers: {
                        'Authorization': LINK_AUTH_KEY
                    }
                })
                    .then(() => {
                        interaction.reply({ content: `Your verification link: https://vr3.dev/verify/${uniqueID}`, ephemeral: true });
                    })
                    .catch(error => {
                        console.error(error);
                        interaction.reply({ content: 'There was an error processing your verification. Please try again later.', ephemeral: true });
                    });
            }
        })
        .catch(error => {
            console.error(error);
            interaction.reply({ content: 'There was an error accessing verification information. Please try again later.', ephemeral: true });
        });

    //await interaction.reply({
    //    content: `Buddy check your your console.`,
    //    flags: MessageFlags.Ephemeral
    //});
}


/*

 client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'verify') {

    } else if (commandName === 'reverify') {
        const discordId = interaction.user.id;

        axios.get(`https://vr3.dev/api/info/${discordId}`, {
            headers: {
                'Authorization': AUTH_KEY
            }
        })
            .then(response => {
                if (response.data.verified) {
                    const verificationTime = moment(response.data.data.verificationTime);
                    const now = moment();
                    const diffDays = now.diff(verificationTime, 'days');

                    if (diffDays < 14) {
                        const nextEligibleDate = verificationTime.add(14, 'days').format('YYYY-MM-DD');
                        interaction.reply({ content: `You must wait until ${nextEligibleDate} to reverify.`, ephemeral: true });
                    } else {
                        const uniqueID = uuidv4();
                        axios.post('https://vr3.dev/api/verify', { discordId, displayName: interaction.user.displayName, uniqueID }, {
                            headers: {
                                'Authorization': AUTH_KEY
                            }
                        })
                            .then(() => {
                                interaction.reply({ content: `Your re-verification link: https://vr3.dev/verify/${uniqueID}`, ephemeral: true });
                            })
                            .catch(error => {
                                console.error(error);
                                interaction.reply({ content: 'There was an error processing your re-verification. Please try again later.', ephemeral: true });
                            });
                    }
                } else {
                    interaction.reply({ content: 'You are not currently verified. Use /verify to link your account.', ephemeral: true });
                }
            })
            .catch(error => {
                console.error(error);
                interaction.reply({ content: 'There was an error accessing verification information. Please try again later.', ephemeral: true });
            });
    }
});*/