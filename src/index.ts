import { client } from "./client";
import { config } from "./config";
import { loadEvents } from "./utils/eventLoader";
import { deployCommands } from "./utils/commandLoader";

client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user?.tag}`);
});

loadEvents();
deployCommands();

client.login(config.discordToken);