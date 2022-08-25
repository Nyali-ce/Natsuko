import { addXp } from '../../utils/xp.js';
import { botOptions } from '../../utils/database.js';

export default {
    name: 'messageCreate',
    run: async (message, client) => {
        console.log(client.commands)
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
                
                cmd.run(message, args, client);
            }
        }
    }
}