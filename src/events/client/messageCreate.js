import { addXp } from '../../utils/xp.js';
import { botOptions } from '../../utils/database.js';
import {PermissionsBitField } from 'discord.js';

export default {
    name: 'messageCreate',
    run: async (message, client) => {
        if (message.author.bot) return;

        if (message.guild) {
            const { prefix } = await botOptions() 

            addXp(message.guild.id, message.author);
            
            if(message.content.startsWith(prefix)) {
                const {commands} = client;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const command = args.shift().toLowerCase();
                const cmd = commands.get(command)

                if (!cmd) return;

                let hasPermission = true

                if(cmd.permissions) {
                    cmd.permissions.forEach(permission => {
                        if(!message.member.permissions.has(PermissionsBitField[permission])) hasPermission = false
                    })
                }

                if(!hasPermission) return message.channel.send('You do not have permission to use this command.')
                cmd.run(message, args, client);
            }
        }
    }
}