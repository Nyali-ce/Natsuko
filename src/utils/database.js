import fs from 'fs';

const request = (path, dataType, id, data) => {
    if (!id) return;
    if (!data) {
        if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify(dataType));
        return JSON.parse(fs.readFileSync(path));
    } else {
        fs.writeFileSync(path, JSON.stringify(data));
    }
}

export function guildOptions(guild_ID, data) { return request(`src/data/guilds/${guild_ID}/options.json`, {}, guild_ID, data) }
export function guildUsers(guild_ID, data) { return request(`src/data/guilds/${guild_ID}/users.json`, {}, guild_ID, data) }
export function botOptions(data) { return request(`src/data/bot/options.json`, {}, 'bot', data) }
