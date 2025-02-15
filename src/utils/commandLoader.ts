import { REST, Routes } from "discord.js";
import { config } from "../config";
import fs from "fs";
import path from "path";

const commands: any[] = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file)).default;
  commands.push(command.data.toJSON());
}

if (!config.discordToken) {
  throw new Error("Discord token is not defined in the configuration.");
}
const rest = new REST({ version: "10" }).setToken(config.discordToken);

export async function deployCommands() {
  if (!config.discordClientId || !config.discordGuildId) {
    throw new Error("Discord client ID or guild ID is not defined in the configuration.");
  }
  try {
    console.log("🚀 Déploiement des commandes...");
    await rest.put(Routes.applicationGuildCommands(config.discordClientId, config.discordGuildId), { body: commands });
    console.log("✅ Commandes enregistrées !");
  } catch (error) {
    console.error("❌ Erreur lors du déploiement des commandes :", error);
  }
}