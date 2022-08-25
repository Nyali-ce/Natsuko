import { addXp } from '../../utils/xp.js';
import { botOptions } from '../../utils/database.js';

export default {
    name: 'messageCreate',
    run: async message => {
        if (message.author.bot) return;

        if (message.guild) {
            const { prefix } = await botOptions() 

            addXp(message.guild.id, message.author);
            
            if(message.content.startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const command = args.shift().toLowerCase();
                const cmd = client.commands.get(command)
                console.log(cmd)
                if (!cmd) return;
                cmd.run(message, args, client);
            }
        }
    }
}