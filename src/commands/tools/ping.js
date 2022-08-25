export default {
    name: 'ping',
    run: async (message, args, client) => {
        const ping = await message.channel.send(`temp`);
        ping.edit(`API Latency: ${client.ws.ping}\nClient Ping: ${ping.createdTimestamp - message.createdTimestamp}ms`);
    }
}