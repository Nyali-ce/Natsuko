import {guildOptions} from '../../utils/database.js'; 

export default {
    name: 'newrole',
    template: 'newrole <role>',
    description: 'Sets the role for new members',
    run: async (message, args) => {
        if(!args[0]) return message.channel.send(`Please provide a role`);
        const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args.join(' ')) || message.guild.roles.cache.find(r => r.id === args[0]);
        
        if (!role) return message.channel.send(`I couldn't find that role.`);
        
        const options = await guildOptions(message.guild.id);

        options.newRole = role.id;
        await guildOptions(message.guild.id, options);

        message.channel.send(`New role set to \`${role.name}\``);
    }
}