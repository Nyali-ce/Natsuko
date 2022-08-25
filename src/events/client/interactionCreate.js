export default {
    name: 'interactionCreate',
    run: async (interaction, client) => {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.run(interaction, client);
            } catch (error) {
                await interaction.reply({
                    content: `An error occured while running the command`,
                    ephemeral: true,
                })
            }
        }
    }
}