import fs from 'fs';

export default {
    name: 'guildCreate',
    run: guild => {
        if (fs.existsSync(`./data/guilds/${guild.id}`)) return;
        fs.mkdirSync(`./data/guilds/${guild.id}`);
    }
}