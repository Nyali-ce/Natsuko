import { addXp } from '../../utils/xp.js';

export default {
    name: 'messageCreate',
    run: async message => {
        if (message.author.bot) return;

        if (message.guild) {
            addXp(message.guild.id, message.author);
            console.log(`${message.author.tag} has received xp in ${message.guild.name}`);
        }
    }
}