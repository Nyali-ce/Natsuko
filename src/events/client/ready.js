import { ActivityType } from 'discord.js'
import { botOptions } from '../../utils/database.js';

export default {
    name: 'ready',
    once: true,
    run: async client => {
        console.log(`Logged in as ${client.user.tag}!`);

        const options = await botOptions();

        if (!options?.presence?.activity || !options.prefix) return;

        if (options.presence.activity.name.includes('${prefix}')) options.presence.activity.name = options.presence.activity.name.replace('${prefix}', options.prefix);

        const status = options.presence.status || 'online';
        const name = options.presence.activity.name || `${prefix}help`;
        const type = ActivityType[options.presence.activity.type] || ActivityType.Watching;

        client.user.setPresence({ status, activities: [{ name, type }] });
    }
}