import fs from 'fs';

export default {
    name: 'guildDelete',
    run: guild => {
        if (!fs.existsSync(`./data/guilds/${guild.id}`)) return;
        fs.rmdirSync(`./data/guilds/${guild.id}`);
    }
}