// DEPENDENCIES
var TelegramBot = require('node-telegram-bot-api');

// CONSTANTS
const TOKEN = ""; // Private token for chat bot authentication

// Setup polling way
var bot = new TelegramBot(TOKEN, { polling: true });

bot.setWebHook('').then(e => console.log('delete webhook result:', e));
console.log("Bot is running");

bot.getMe().then(function (me) {
  console.log('Hi my name is %s!', me.username);
});

// Matches /roll [whatever]
bot.onText(/\/roll (.+)/, function (msg, match) {console.log(msg);
  var fromId = msg.chat.id;
  var args = match[1].split(" ");

  var numDice = 1;
  var numSides = 6;

  if (args.length == 1 && !isNaN(args[0])) {
      numDice = parseInt(args[0]);
  } else if (args.length == 1) {
      // expect XdY
      var xdy = args[0].toLowerCase().split("d");
      if (xdy.length == 2 && !isNaN(xdy[0]) && !isNaN(xdy[1])) {
          numDice = xdy[0];
          numSides = xdy[1];
      } else {
          // error
          bot.sendMessage(fromId, "Couldn't understand that");
          return;
      }
  } else if (args.length == 2 && !isNaN(args[0]) && !isNaN(args[1])) {
      numDice = parseInt(args[0]);
      numSides = parseInt(args[1]);
  } else {
      // undefined behavior
      bot.sendMessage(fromId, "Couldn't understand that");
      return;
  }

  var results = [];
  numDice = numDice > 200 ? 200 : numDice;
  for (var i = 0; i < numDice; i++) {
      results.push(Math.floor(numSides * Math.random()) + 1);
  }
  bot.sendMessage(fromId, results.join(" "));
});

// Matches /roll
bot.onText(/\/roll$/, function (msg, match) {
    var fromId = msg.chat.id;
    bot.sendMessage(fromId, Math.floor(6 * Math.random()) + 1);
});

module.exports = bot;