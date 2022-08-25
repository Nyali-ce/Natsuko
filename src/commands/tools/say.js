export default {
    name: 'say',
    permissions: ['MANAGE_MESSAGES'],
    run: async (message, args) => {
        if (!args[0]) return message.channel.send('Please provide a message to send.');
        message.delete();
        message.channel.send(args.join(' '));
        console.log(`${message.author.tag} used the say command in ${message.guild.name}: ${args.join(' ')}`);
    }
}