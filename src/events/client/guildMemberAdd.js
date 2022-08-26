import { guildOptions } from "../../utils/database.js"

export default {
    name: 'guildMemberAdd',
    run: async (member) => {
        const options = await guildOptions(member.guild.id);

        if (!options.newRole) return;

        const role = member.guild.roles.cache.find(r => r.id == options.newRole);
        if (!role) return;

        member.roles.add(role);
    }
}