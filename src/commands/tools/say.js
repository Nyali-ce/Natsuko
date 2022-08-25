export default {
    name: 'say',
    permissions: ['MANAGE_MESSAGES'],
    run: async (message, args) => {
        if (!args[0]) return message.channel.send('Please provide a message to send.');
        message.delete();
        // message.channel.send(args.join(' '));
    }
}