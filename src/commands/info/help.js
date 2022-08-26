import { Embed, EmbedBuilder } from 'discord.js';
import fs from 'fs';
import { botOptions } from '../../utils/database.js';

export default {
    name: "help",
    template: "help || help <command>",
    description: "Shows this message.",
    run: (message, args) => {
        if(!args[0]) {
            let commandData = []
            const commandFolders = fs.readdirSync('./src/commands/');
            commandFolders.forEach((folder, folderIndex) => {
                commandData.push([])
                const commands = fs.readdirSync(`./src/commands/${folder}`);
                commands.forEach(async commandFile => {
                    const {default: command} = await import(`../${folder}/${commandFile}`)
                    commandData[folderIndex].push(`${command.name}`);
                })
            })

            const embed = new EmbedBuilder()
            .setTitle(`Help menu`)
            message.channel.send({embeds: [embed]})
        } else {
            let found = false;
            let commandNameInput = args[0].toLowerCase();
            const commandfolders = fs.readdirSync('./src/commands/');
            commandfolders.forEach(folder => {
                const commandFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('.js'));
                commandFiles.forEach(async commandFile => {
                    if(commandFile.slice(0, commandFile.length - 3).toLowerCase() === commandNameInput) {
                        found = true;
                        const color = await botOptions().color
                        const {default: command} = await import(`../${folder}/${commandFile}`); 
                        const name = command.name.slice(0,1).toUpperCase() + command.name.slice(1);   
                        const embed = new EmbedBuilder()
                            .setTitle(name)
                            .setDescription(command.description)
                            .addFields({name: 'Usage', value: `\`${command.template}\``})
                            .setColor(color);
                        return message.channel.send({embeds: [embed]});
                    }
                })
            })
            if(found) return 
            message.channel.send(`Command ${commandNameInput} not found.`);
        }
    }
}