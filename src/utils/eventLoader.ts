import fs from "fs";
import path from "path";
import { client } from "../client";

export function loadEvents() {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file)).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}