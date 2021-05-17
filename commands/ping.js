module.exports = {
  triggers: ["ping"],
  minArgs: 1,
  maxArgs: 1,
  requiredRoles: ["791389237269626903"],
  run: async({client, message, args}) => {
   let msg = await message.channel.send("pong..");
    msg.edit(`${Date.now() - msg.createdTimestamp}ms`);
  }
}