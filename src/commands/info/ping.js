export default {
    name: 'ping',
    template: 'ping',
    description: 'returns discord\'s API Latency and the Client\'s ping',
    run: async (message, args, client) => {
        const ping = await message.channel.send(`temp`);
        ping.edit(`API Latency: ${client.ws.ping}\nClient Ping: ${ping.createdTimestamp - message.createdTimestamp}ms`);
    }
}