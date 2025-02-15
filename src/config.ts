import 'dotenv/config';

export const config = {
    apiKey: process.env.X_API_KEY,
    discordToken: process.env.DISCORD_TOKEN,
    discordClientId: process.env.CLIENT_ID,
    discordGuildId: process.env.GUILD_ID,
};
