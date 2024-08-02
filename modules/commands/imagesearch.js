module.exports.config = {
  name: "imagesearch",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "John Roy",
  description: "Search an Image",
  commandCategory: "Tiện ích",
  usages: "imagesearch [text]",
  cooldowns: 60,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "googlethis": "",
    "cloudscraper": ""
  }
};

module.exports.run = async ({ matches, event, api, extra, args }) => {
  const axios = global.nodemodule['axios'];
  const google = global.nodemodule["googlethis"];
  const cloudscraper = global.nodemodule["cloudscraper"];
  const fs = global.nodemodule["fs"];

  var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
  api.sendMessage(`🔎 Searching for ${query}...`, event.threadID, event.messageID);

  try {
    let result = await google.image(query, { safe: false });
    if (result.length === 0) {
      api.sendMessage(`⚠️ Your image search did not return any result.`, event.threadID, event.messageID);
      return;
    }

    let streams = [];
    let counter = 0;

    for (let image of result) {
      // Only show 6 images
      if (counter >= 6)
        break;

      // Ignore urls that do not end with .jpg or .png
      let url = image.url;
      if (!url.endsWith(".jpg") && !url.endsWith(".png"))
        continue;

      let path = __dirname + `/cache/search-image-${counter}.jpg`;
      let buffer = await cloudscraper.get({ uri: url, encoding: null });

      fs.writeFileSync(path, buffer);

      console.log(`Pushed to streams: ${path}`);
      streams.push(fs.createReadStream(path).on("end", async () => {
        if (fs.existsSync(path)) {
          fs.unlink(path, (err) => {
            if (err) return console.log(err);

            console.log(`Deleted file: ${path}`);
          });
        }
      }));

      counter += 1;
    }

    api.sendMessage("⏳ Sending search result...", event.threadID, event.messageID);

    let msg = {
      body: `--------------------\nImage Search Result\n"${query}"\n\nFound: ${result.length} image${result.length > 1 ? 's' : ''}\n\n--------------------`,
      attachment: streams
    };

    api.sendMessage(msg, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage(`⚠️ An error occurred during the image search.`, event.threadID, event.messageID);
  }
};
