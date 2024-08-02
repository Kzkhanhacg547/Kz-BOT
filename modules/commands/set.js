

module.exports.config = {
  name: "set",
  version: "1.1.0", // Updated version
  hasPermssion: 1,
  credits: "Team Mirai",
  description: "Change something of group",
  commandCategory: "Box",
  usages: "set [emoji/avt/Bname/name/QTV/rcolor/forward] [args]",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": ""
  },
};

module.exports.run = async function({ api, event, args, Threads }) {
  const request = require("request");
  const fs = require("fs-extra");

  if (args[0] == "emoji") {
    if (!args[1]) {
      var emoji = "😀,😃,😄,😁,😆,😅,😂,🤣,😊,😇,🙂,🙃,😉,😌,😍,🥰,😘,😗,😙,😚,😋,😛,😝,😜,🤪,🤨,🧐,🤓,😎,🤩,🥳,😏,😒,😞,😔,😟,😕,🙁,☹️,😣,😖,😫,😩,🥺,😢,😭,😤,😠,😡,🤬,🤯,😳,🥵,🥶,😱,😨,😰,😥,😓,🤗,🤔,🤭,🤫,🤥,😶,😐,😑,😬,🙄,😯,😦,😧,😮,😲,🥱,😴,🤤,😪,😵,🤐,🥴,🤢,🤮,🤧,😷,🤒,🤕,🤠,🤑,😈,👿,👹,💀,👺,👻,🤡,💩,☠️,👽,👾,🤖,🎃,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🤲,👐,🙌,👏,🤝,👍,👎,👊,✊,🤛,🤜,✌️,🤟,🤘,👌,🤏,👈,👉,👆,👇,☝️,✋,🤚,🖐️,🖖,👋,🤙,💪,🖕,✍️,🙏,🦾,🦿,🦶,🦵,💄,💋,👄,🦷,👅,👂,🦻,👃,👣,👁️,👀,🧠,🗣️,👤,👥,👶,👧,🧒,👦,👩,🧑,👨,👩‍🦱,👨‍🦱,👩‍🦰,👨‍🦰,👱‍♀️,👱‍♂️,👩‍🦳,👨‍🦳,👩‍🦲,👨‍🦲,🧔,👵,🧓,👴,👲,👳‍♀️,👳‍♂️,🧕,👮‍♀️,👮‍♂️,👷‍♀️,👷‍♂️,💂‍♀️,💂‍♂️,🕵️‍♀️,🕵️‍♂️,👩‍⚕️,👨‍⚕️,👩‍🌾,👨‍🌾,👩‍🍳,👨‍🍳,👩‍🎓,👨‍🎓,👩‍🎤,👨‍🎤,👩‍🏫,👨‍🏫,👩‍🏭,👨‍🏭,👩‍💻,👨‍💻,👩‍💼,👨‍💼,👩‍🔧,👨‍🔧,👩‍🔬,👨‍🔬,👩‍🎨,👨‍🎨,👩‍🚒,👨‍🚒,👩‍✈️,👨‍✈️,👩‍🚀,👨‍🚀,👩‍⚖️,👨‍⚖️,👰,🤵,👸,🤴,🦸‍♀️,🦸‍♂️,🦹‍♀️,🦹‍♂️,🤶,🎅,🧙‍♀️,🧙‍♂️,🧝‍♀️,🧝‍♂️,🧛‍♀️,🧟‍♀️,🧛‍♂️,🧟‍♂️,🧞‍♀️,🧞‍♂️,🧜‍♀️,🧜‍♂️,🧚‍♀️,🧚‍♂️,👼,🤰,🤱,🙇‍♀️,🙇‍♂️,💁‍♀️,💁‍♂️,🙅‍♀️,🙅‍♂️,🙆‍♀️,🙆‍♂️,🙋‍♀️,🙋‍♂️,🤦‍♀️,🤦‍♂️,🤷‍♀️,🤷‍♂️,🧏‍♀️,🧏‍♂️,🙎‍♀️,🙎‍♂️,🙍‍♀️,🙍‍♂️,💇‍♀️,💇‍♂️,💆‍♀️,💆‍♂️,🧖‍♀️,🧖‍♂️,💅,🤳,💃,🕺,👯‍♂️,👯‍♂️,🕴️,🚶‍♀️,🚶‍♂️,🧍‍♀️,🧍‍♂️,🧎‍♀️,🧎‍♂️,👩‍🦯,👨‍🦯,👩‍🦼,👨‍🦼,👩‍🦽,🏃‍♀️,🏃‍♂️,👫,👭,👬,💑,👩‍❤️‍👩,👨‍❤️‍👨,💏,👩‍❤️‍💋‍👩,👨‍❤️‍💋‍👨,👨‍👩‍👦,👨‍👩‍👧,👨‍👩‍👧‍👦,👨‍👩‍👦‍👦,👨‍👩‍👧‍👨‍👩‍👧‍👧,👩‍👩‍👦,👩‍👩‍👧,👩‍👩‍👧‍👦,👩‍👩‍👦‍👦,👩‍👩‍👧‍👧,👨‍👨‍👦,👨‍👨‍👧,👨‍👨‍👧‍👦,👨‍👨‍👦‍👦,👨‍👨‍👧‍👧,👩‍👦,👩‍👧,👩‍👧‍👦,👩‍👦‍👦,👩‍👧‍👧,👨‍👦,👨‍👧,👨‍👧‍👦,👨‍👦‍👦,👨‍👧‍👧,🧶,🧵,🧥,🥼,👚,👕,👖,👔,👗,🩱,👙,🩳,🩲,👘,👞,🦺,🥿,👠,👡,👢,🩰,👞,👟,🥾,🧦,🧤,🧣,🎩,🧢,👒,🎓,⛑️,👑,💍,👝,👛,👜,💼,🎒,🧳,👓,🕶️,🌂,🥽,🐶,🐱,🐭,🐹,🐰,🦊,🐻,🐼,🐨,🐯,🦁,🐮,🐷,🐽,🐽,🐸,🐵,🙈,🙉,🙊,🐒,🐔,🐧,🐦,🐤,🐣,🐥,🦆,🦅,🦉,🦇,🐺,🐗,🐴,🦄,🐝,🐛,🦋,🐌,🐞,🐜,🦟,🦗,🕷️,🦂,🦠,🐢,🐍,🦎,🦖,🦕,🐙,🦑,🦐,🦞,🦀,🐡,🐠,🐟,🐬,🐳,🐋,🦈,🐊,🐅,🐆,🦓,🦍,🐘,🦏,🐪,🐫,🦙,🦒,🐃,🐂,🐄,🐎,🐖,🐏,🐑,🦧,🦮,🐕‍🦺,🐩,🐈,🐓,🦃,🦚,🦜,🦢,🦩,🕊️,🐇,🐁,🐀,🐿️,🦔,🐾,🐉,🐲,🌵,🎄,🌲,🌳,🌴,🌱,🌿,☘️,🍀,🎍,🎋,🍃,🍂,🍁,🍄,🐚,🪨,🌾,💐,🌷,🌹,🥀,🌺,🌸,🌼,🌻,🌞,🌝,🌛,🌜,🌚,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌙,🌍,🌎,🌏,💫,⭐,🌟,✨,⚡,🔥,💥,☄️,☀️,🌤️,⛅,🌥️,🌦️,🌈,☁️,🌧️,⛈️,🌩️,🌨️,❄️,☃️,⛄,🌬️,💨,💧,💦,🕰️,⌛,⏳,⌚,⏰,⏱️,⏲️,🕰️,🕛,🕧,🕐,🕜,🕑,🕝,🕒,🕞,🕓,🕟,🕔,🕠,🕕,🕡,🕖,🕢,🕗,🕣,🕘,🕤,🕙,🕥,🕚,🕦,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌙,🌚,🌛,🌜,🌝,🌞,🪐,⭐,🌟,💫,✨,⚡,🔥,💥,☄️,☀️,🌤️,⛅,🌥️,🌦️,🌈,☁️,🌧️,⛈️,🌩️,🌨️,❄️,☃️,⛄,🌬️,💨,💧,💦,🕰️,⌛,⏳,⌚,⏰,⏱️,⏲️,🕰️,🕛,🕧,🕐,🕜,🕑,🕝,🕒,🕞,🕓,🕟,🕔,🕠,🕕,🕡,🕖,🕢,🕗,🕣,🕘,🕤,🕙,🕥,🕚,🕦,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌙,🌚,🌛,🌜,🌝,🌞,🪐,⭐,🌟,💫,✨,⚡,🔥,💥,☄️,☀️,🌤️,⛅,🌥️,🌦️,🌈,☁️,🌧️,⛈️,🌩️,🌨️,❄️,☃️,⛄,🌬️,💨,💧,💦,🕰️,⌛,⏳,⌚,⏰,⏱️,⏲️,🕰️,🕛,🕧,🕐,🕜,🕑,🕝,🕒,🕞,🕓,🕟,🕔,🕠,🕕,🕡,🕖,🕢,🕗,🕣,🕘,🕤,🕙,🕥,🕚,🕦";
      return api.sendMessage(`Missing emoji. Here are all supported emojis:\n\n${emoji}`, event.threadID, event.messageID);
    } else {
      try {
        await api.changeThreadEmoji(args[1], event.threadID);
        return api.sendMessage(`Changed emoji to ${args[1]} successfully.`, event.threadID, event.messageID);
      } catch (error) {
        return api.sendMessage(`Failed to change emoji. Error: ${error.message}`, event.threadID, event.messageID);
      }
    }
  }

  if (args[0] == "name") {
    if (!args[1]) return api.sendMessage("You must enter a new name for the group", event.threadID, event.messageID);
    try {
      await api.changeThreadName(args.slice(1).join(" "), event.threadID);
      return api.sendMessage(`Changed name to ${args.slice(1).join(" ")} successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to change name. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "avt") {
    try {
      const { threadID, messageID } = event;
      const url = args[1];
      if (!url) return api.sendMessage("You must provide a URL to the new avatar image.", threadID, messageID);
      request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + `/cache/1.png`)).on("close", () => api.changeGroupImage(fs.createReadStream(__dirname + `/cache/1.png`), threadID, async (err) => {
        if (err) return api.sendMessage(`Failed to change avatar. Error: ${err.message}`, threadID, messageID);
        return api.sendMessage("Changed avatar successfully.", threadID, messageID);
      }));
    } catch (error) {
      return api.sendMessage(`Failed to change avatar. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "Bname") {
    const name = args.slice(2).join(" ");
    if (!name) return api.sendMessage("You must enter a new name for the bot", event.threadID, event.messageID);
    try {
      const mentions = event.mentions;
      const mentionIDs = Object.keys(mentions);
      if (mentionIDs.length === 0) return api.sendMessage("You must tag the bot to change its name.", event.threadID, event.messageID);
      await api.changeNickname(name, event.threadID, mentionIDs[0]);
      return api.sendMessage(`Changed bot's name to ${name} successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to change bot's name. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "QTV") {
    if (!args[1]) return api.sendMessage("You must tag the user to change their role.", event.threadID, event.messageID);
    try {
      const mentions = event.mentions;
      const mentionIDs = Object.keys(mentions);
      if (mentionIDs.length === 0) return api.sendMessage("You must tag the user to change their role.", event.threadID, event.messageID);
      await api.changeAdminStatus(event.threadID, mentionIDs[0], true);
      return api.sendMessage(`Promoted ${mentions[mentionIDs[0]]} to admin successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to promote user to admin. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "rcolor") {
    if (!args[1]) return api.sendMessage("You must provide a color.", event.threadID, event.messageID);
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    if (!colors.includes(args[1])) return api.sendMessage("Invalid color. Supported colors are: " + colors.join(", "), event.threadID, event.messageID);
    try {
      await api.changeThreadColor(args[1], event.threadID);
      return api.sendMessage(`Changed group color to ${args[1]} successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to change group color. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "adduser") {
    if (!args[1]) return api.sendMessage("You must provide a user ID.", event.threadID, event.messageID);
    try {
      await api.addUserToGroup(args[1], event.threadID);
      return api.sendMessage(`Added user ${args[1]} successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to add user. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "rmuser") {
    if (!args[1]) return api.sendMessage("You must provide a user ID.", event.threadID, event.messageID);
    try {
      await api.removeUserFromGroup(args[1], event.threadID);
      return api.sendMessage(`Removed user ${args[1]} successfully.`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(`Failed to remove user. Error: ${error.message}`, event.threadID, event.messageID);
    }
  }



  return api.sendMessage("Invalid command. Type help to see the list of available commands.", event.threadID, event.messageID);
};

module.exports.handleEvent = async function({ api, event }) {
  const { body, threadID, messageID } = event;
  const lowerCaseBody = body.toLowerCase();
  if (lowerCaseBody === "help") {
    return api.sendMessage("Here are the available commands:\n- !setemoji <emoji>\n- !name <new name>\n- !avt <image URL>\n- !Bname <bot name>\n- !QTV <@user>\n- !rcolor <color>\n- !setemoji <emoji>\n- !adduser <user ID>\n- !rmuser <user ID>\n- !reset\n- !forward <message ID> <user ID>", threadID, messageID);
  }
};
