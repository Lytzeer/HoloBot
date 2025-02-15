import { Interaction } from "discord.js";

export default {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const command = require(`../commands/${interaction.commandName}.ts`).default;
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "❌ Erreur lors de l'exécution de la commande.", ephemeral: true });
    }
  }
};