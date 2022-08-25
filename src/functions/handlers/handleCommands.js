import fs from 'fs';

export default client => {
    const commandFolders = fs.readdirSync('src/commands');
    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('.js'));
        commandFiles.forEach(async file => {
            const { default: command } = await import(`../../commands/${folder}/${file}`);
            if (!command || !command.name || !command.run) return console.log(`${file} is not a valid command.`);
            const { commands, commandArray } = client;
            commands.set(command.name, command);
            commandArray.push(command);
        });
    });
}