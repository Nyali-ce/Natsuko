import fs from 'fs';

export default {
    name: 'guildDelete',
    run: guild => {
        if (!fs.existsSync(`src/data/guilds/${guild.id}`)) return;
        
        const guildFolder = fs.readdirSync(`src/data/guilds/${guild.id}`);
        
        guildFolder.forEach(file => {
            fs.unlinkSync(`src/data/guilds/${guild.id}/${file}`);
        })

        fs.rmdirSync(`src/data/guilds/${guild.id}`);
    }
}