import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';
import fs from "fs"


export default {
	data: new SlashCommandBuilder()
		.setName('packs')
		.setDescription("Liste les différents boosters disponibles"),
	async execute(interaction: any) {
        const sets: string[] = JSON.parse(fs.readFileSync("../availableSet.json", "utf-8"));

        if (!sets.length) {
            const embed = new EmbedBuilder()
                .setColor("#FFD700")
                .setTitle("📦 Sets disponibles")
                .setDescription("⚠️ Aucun set disponible.")
                .setTimestamp();
        return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        const setsList = sets.map(set => `🔹 ${set}`).join("\n");

        const embed = new EmbedBuilder()
            .setColor("#FFD700")
            .setTitle("📦 Sets disponibles")
            .setDescription(setsList)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
	},
};