const fs = require("fs");
const path = require("path");
const prefix = "c!";
exports.handle = async function(message) {
  if (message.author.bot) return;
  if (message.channel.type.toLowerCase() === "dm") return;
  if (message.author.id !== process.env.oID) return;

  //   const command = `${prefix}${alias.toLowerCase()}`;
  let [command, ...args] = message.content.slice(prefix.length).split(/ +/g);
  command =
    command && this.cmds.find(c => c.triggers.includes(command.toLowerCase()));
  if (!command) return;
  let {
    triggers,
    minArgs = 0,
    maxArgs = null,
    expectedArgs = "",
    requiredRoles = [],
    inDB,
    run
  } = command;
  // A command has been ran
  console.log("[INFO] A command has been ran:", triggers[0]);
  if (inDB) {
  }
  // Ensure the user has the required roles
  for (const requiredRole of requiredRoles) {
    const role = message.guild.roles.find(
      role => role.name === requiredRole || role.id == requiredRole
    );
    if (!role || !message.member.roles.has(role.id)) {
      return message.reply(
        `you must have the **${requiredRole}** role to use this command.`
      );
    }
  } // Split on any number of spaces

  // Handle the custom command code
  const { client } = this;
  run({ client, message, args, Swolly: this });
};
