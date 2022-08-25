import { guildUsers } from './database.js';

const getLevel = (xp) => {
    return Math.max(Math.floor((xp - 465) / 125), 0) + Math.max(Math.floor(((xp - Math.max(Math.floor((xp - 465) / 125), 0) * 125) - 15) / 50), 0) + Math.min(Math.max(Math.floor((xp - Math.max(Math.floor((xp - 465) / 125), 0) * 125 - Math.max(Math.floor(((xp - Math.max(Math.floor((xp - 465) / 125), 0) * 125) - 15) / 50), 0) * 50) / 15), 0), 1)
}

export async function addXp(guild_ID, member) {
    const user_ID = member?.id;

    if (!guild_ID || !member || !user_ID) return;

    const users = await guildUsers(guild_ID);

    if (!users[user_ID]) {
        users[user_ID] = {
            xp: Math.floor(Math.random() * 10) + 1,
            lastMessage: new Date().getTime()
        }
        return guildUsers(guild_ID, users);
    }

    if (users[user_ID].lastMessage > Date.now() - 60000) return
    let xp = Math.floor(Math.random() * 10) + 1
    let level = getLevel(users[user_ID].xp)
    let newLevel = getLevel(users[user_ID].xp + xp)
    if (newLevel > level) {
        try {
            await member.send(`You've level up to level ${newLevel}!`)
        } catch (error) {
            console.log(error)
        }
    }
    users[user_ID].xp += xp
    users[user_ID].lastMessage = new Date().getTime()
    return guildUsers(guild_ID, users)
}