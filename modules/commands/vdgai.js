module.exports.config = {
  name: "vdgai",
  version: "1.0.1", 
  hasPermission: 0, // Corrected typo in hasPermission
  credits: "Kz Khánhh",
  description: "Xem video",
  commandCategory: "Video", // Corrected category
  usages: "vdgai",
  cooldowns: 2
};

module.exports.run = async ({ api, event ,Users}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const video = require('./../../modules/commands/Kz-API/public/images/data/json/videogaixinh.json');
  const randomVideo = video[Math.floor(Math.random() * video.length)].trim();
  const fileName = '2.mp4';
  const filePath = __dirname + `/${fileName}`;

  function downloadAndSendImage(image, fileName, callback) {
    request(image).pipe(fs.createWriteStream(fileName)).on("close", callback);
  }

  let callback = function () {
    return api.sendMessage({
      body: 'Video gái của bạn đây',
      attachment: [
        fs.createReadStream(filePath)
      ]
    }, event.threadID, () => {
      fs.unlinkSync(filePath);
    }, event.messageID);
  };
  downloadAndSendImage(randomVideo, filePath, callback);
}