import fs from 'fs';

export default {
    name: 'guildCreate',
    run: guild => {
        if (fs.existsSync(`src/data/guilds/${guild.id}`)) return;
        fs.mkdirSync(`src/data/guilds/${guild.id}`);
    }
}