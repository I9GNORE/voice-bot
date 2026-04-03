const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const TOKEN = process.env.TOKEN;
const LOG_CHANNEL_ID = "1489612253513650307";

client.on("clientReady", () => {
  console.log(`Бот запущен как ${client.user.tag}`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  const channel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!channel) return;

  const member = newState.member;
  if (!member) return;

  // Только вход в голосовой канал
  if (!oldState.channel && newState.channel) {

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71) // зелёная линия слева
      .setDescription(`🔊 **${member.displayName}** зашёл в 🔊・${newState.channel.name}`)
      .setTimestamp(); // время

    channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);

require("http").createServer((req, res) => {
  res.end("OK");
}).listen(process.env.PORT || 3000);


