import fs from 'fs';

export default client => {
    const eventFolders = fs.readdirSync('src/events');
    eventFolders.forEach(folder => {
        const eventFiles = fs.readdirSync(`src/events/${folder}`).filter(file => file.endsWith('.js'));
        switch (folder) {
            case 'client':
                eventFiles.forEach(async file => {
                    const { default: event } = await import(`../../events/${folder}/${file}`);
                    if (!event || !event.name || !event.run) return;
                    if (event.once) client.once(event.name, (...args) => event.run(client, ...args));
                    else client.on(event.name, (...args) => event.run(...args, client));
                });
                break;
            default:
                break;
        }
    })
}