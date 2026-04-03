const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

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

  const member = newState.member;
  if (!member) return;

  // 👉 Только вход в канал
  if (!oldState.channel && newState.channel) {

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.displayAvatarURL()
      })
      .setDescription(`🟢 **Зашёл в голосовой канал**`)
      .addFields(
        { name: "🎧 Канал", value: `**${newState.channel.name}**`, inline: true },
        { name: "👤 Пользователь", value: `<@${member.id}>`, inline: true }
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);

// чтобы Render не вырубал
require("http").createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
}).listen(process.env.PORT || 3000);
