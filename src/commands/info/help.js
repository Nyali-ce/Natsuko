import { Embed } from 'discord.js';
import fs from 'fs';

export default {
    name: "help",
    template: "help || help <command>",
    description: "Shows this message.",
    run: (message, args) => {
        if(!args[0]) {
            const commandFolders = fs.readdirSync('./src/commands/');
            commandFolders.forEach(folder => {
                const commands = fs.readdirSync(`./src/commands/${folder}`);
                commands.forEach(command => {
    
                })
            })
        } else {
            let commandNameInput = args[0].toLowerCase();
            const commandfolders = fs.readdirSync('./src/commands/');
            commandfolders.forEach(folder => {
                const commandFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('.js'));
                commandFiles.forEach(command => {
                    console.log(command)
                    if(command.slice(0, command.length - 3).toLowerCase() === commandNameInput) {
                        const {default: command} = import(`./${folder}/${command}`); 
                        const embed = new Embed()
                            .setTitle(command.name)
                            .setDescription(command.description)
                            .addField('Usage', command.template)
                            .setColor(0x00AE86);
                        return message.channel.send(embed);
                    }
                })
            })

            message.channel.send(`Command ${commandNameInput} not found.`);
        }
    }
}