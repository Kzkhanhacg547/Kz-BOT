const request = require('request');
const fs = require("fs");

const sagiriConfig = {
  name: "sagiri",
  version: "4.0.0",
  permissionLevel: 0,
  rent: 2,
  credits: "Kz Khánhh",
  description: "sos",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 5
};

const downloadAndSendImages = async ({ api, event, args, Threads }) => {
  const imageLists = [
    require('./../../img/sagiri.json'),
    require('./../../img/sagiri.json')
  ];

  function downloadImage(imageUrl, fileName, callback) {
    request(imageUrl).pipe(fs.createWriteStream(__dirname + `/` + fileName)).on("close", callback);
  }

  const numImages = Math.floor(Math.random() * 6) + 1;
  let imagesDownloaded = 0;
  let attachments = [];

  for (let i = 0; i < numImages; i++) {
    const randomImageList = imageLists[Math.floor(Math.random() * imageLists.length)];
    let imageUrl = randomImageList[Math.floor(Math.random() * randomImageList.length)].trim();
    let imgFileName = `image_${i}.png`;

    downloadImage(imageUrl, imgFileName, () => {
      imagesDownloaded++;
      attachments.push(fs.createReadStream(__dirname + `/${imgFileName}`));

      if (imagesDownloaded === numImages) {
        api.sendMessage({
          body: ``,
          attachment: attachments
        }, event.threadID, () => {
          for (let img of attachments) {
            fs.unlinkSync(img.path);
          }
        }, event.messageID);
      }
    });
  }
}

module.exports = {
  config: sagiriConfig,
  run: downloadAndSendImages
};
