const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const TOKEN = process.env.TOKEN;
const LOG_CHANNEL_ID = "1489612253513650307";

client.on("ready", () => {
  console.log(`Бот запущен как ${client.user.tag}`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const channel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!channel) return;

  if (!oldState.channel && newState.channel) {
    channel.send(`🔊 ${newState.member.displayName} зашёл в ${newState.channel.name}`);
  }

  if (oldState.channel && !newState.channel) {
    channel.send(`🔇 ${oldState.member.displayName} вышел из ${oldState.channel.name}`);
  }
});

client.login(TOKEN);

require("http").createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
}).listen(process.env.PORT || 3000);
