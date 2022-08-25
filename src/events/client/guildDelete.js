import fs from 'fs';

export default {
    name: 'guildDelete',
    run: guild => {
        if (!fs.existsSync(`src/data/guilds/${guild.id}`)) return;
        fs.rmdirSync(`src/data/guilds/${guild.id}`);
    }
}