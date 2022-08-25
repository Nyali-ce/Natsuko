import fs from 'fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

process.on('unhandledRejection', err => console.error(`${err?.stack ?? `Unkown error`}\nNode NOT Exiting...`));

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.commands = new Collection();
client.commandArray = [];

const imports = new Promise(resolve => {
    const functionFolders = fs.readdirSync('src/functions');
    functionFolders.forEach((folder, folderIndex) => {
        const functionFiles = fs.readdirSync(`src/functions/${folder}`).filter(file => file.endsWith('.js'));
        functionFiles.forEach((file, fileIndex) => {
            import(`./functions/${folder}/${file}`).then(({ default: function_ }) => {
                if (function_) function_(client)
                if (folderIndex === functionFolders.length - 1 && fileIndex === functionFiles.length - 1) return resolve();
            });
        });
    })
})

imports.then(() => {
    client.login(process.env.TOKEN);
})