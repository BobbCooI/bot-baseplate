const Discord = require('discord.js');
const swient = new Discord.Client();
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const Bot = require('./bot.js');
const cors = require('cors');
/** For the bot itself V */
swient.login(process.env.token);
let Swolly = new Bot(swient);
(async() => {await Swolly.deploy()})();
/** For the bot iself ^ */

/** For express app V */
app.set('trust proxy', 1);
app.use(morgan(':method | :url | :status :response-time ms | Content length - :res[content-length] | ip - :remote-addr | header - :req[header]'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',async (req, res,next) => {
   // Here I can do whatever I want for every request. Such as update a statistic.
next();
})
let port = 3000;
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});

app.get('/', (req, res) => {
  res.send("Hello World!");
});
/** For express app ^ */