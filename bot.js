const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
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

  const member = newState.member || oldState.member;
  const avatar = member.user.displayAvatarURL();

  // Получаем роль (самую высокую)
  const role = member.roles.highest?.name || "Без роли";

  // 🟢 ЗАШЁЛ
  if (!oldState.channel && newState.channel) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setAuthor({
        name: member.displayName,
        iconURL: avatar
      })
      .setDescription(
        `🟢 **Зашёл в голосовой канал**\n\n` +
        `🎧 Канал: **${newState.channel.name}**\n` +
        `🏷 Роль: **${role}**`
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }

  // 🔴 ВЫШЕЛ
  if (oldState.channel && !newState.channel) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setAuthor({
        name: member.displayName,
        iconURL: avatar
      })
      .setDescription(
        `🔴 **Вышел из голосового канала**\n\n` +
        `🎧 Канал: **${oldState.channel.name}**\n` +
        `🏷 Роль: **${role}**`
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);

// 🌐 сервер для Render
require("http").createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
}).listen(process.env.PORT || 3000);
