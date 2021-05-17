const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
let prefix = "c!";
const { validatePermissions } = require('./helpers/utils.js');
module.exports = class Bolly {
  constructor(client) {
    this.client = client;
    this.utils= require('./helpers/utils.js');
    this.loggers=require('./helpers/log.js')(this)
    this.cmds = [];
  }
  async deploy() {
    console.log("deploying...")
  	this.client.on('ready', this.ready.bind(this));
		const listeners = require(path.join(__dirname, 'events'));
		for (const listener of listeners) {
			if (listener !== 'INTERACTION_CREATE') {
				this.client.on(
					listener,
					require(path.join(__dirname, 'events', listener)).handle.bind(this)
				);
			}
		}
  }
       loadCommands() {
				const commands = fs.readdirSync(path.join(__dirname, 'commands'));
for(let cmdFile of commands) {
   const cmd = require(path.join(__dirname, 'commands', cmdFile));
if(!Array.isArray(cmd.triggers)) throw new Error(`${cmdFile} needs to have an array of triggers!`);
  this.cmds.push(cmd);
}
    
         
    }
async ready() {
  this.loadCommands();

  		this.loggers.log(`Ready: ${process.memoryUsage().rss / 1024 / 1024}MB`, 'ready');
  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== "handler.js") {
        const option = require(path.join(__dirname, dir, file));
        //   commandBase(client, option)
        let {
          triggers,
          minArgs = 0,
          maxArgs = null,
          expectedArgs = "",
          requiredRoles = [],
          inDB,
          run
        } = option;
        // Ensure the command and aliases are in an array
        if (typeof triggers === "string") {
          triggers = [triggers];
        }
        console.log(`✅ Loaded command  ${triggers[0]} 👻`);
        // Ensure the permissions are in an array and are all valid
      }
    }
  };
  readCommands("commands");
  console.log("The client is ready!");
}

}