const fonts = "/bot/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
module.exports.config = {
    name: "card",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "tpk fix by Lê Minh Tiến🐧 fix lần 2 tobi FIX LẦN 3 Kz Khánhh",
    description: "cardinfo user",
    commandCategory: "Tiện ích",
    usages: "reply stt",
    cooldowns: 0,
};
module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async ({ event, api }) => {
const axios = require("axios");
const { threadID, messageID, senderID } = event;
var tpk = [
"https://imgur.com/kSfS1wX.png", 
"https://i.imgur.com/rqbC4ES.jpg", 
"https://i.imgur.com/zET6S0F.png", 
"https://i.imgur.com/C8yIgMZ.png", 
"https://i.imgur.com/8UaB48J.png", 
"https://i.imgur.com/AJdZtK9.jpg", 
"https://i.imgur.com/ufsPjwE.png", 
"https://i.imgur.com/kPDp0s7.jpg",
"https://i.imgur.com/fBgFUr8.png",
"https://i.imgur.com/CECvNsj.jpg",
"https://i.imgur.com/OfAgOKR.png",
"https://i.imgur.com/Xa1ybRA.jpg",
"https://i.imgur.com/nX5W2Ru.jpg",
"https://i.imgur.com/TFbVhfN.jpg" 
]
  let image = [];
 for(i of tpk) {
 const stream = (await axios.get(i, {
        responseType: "stream"
    })).data;
    image.push(stream);
};
  const msg = {
    body: `==[ 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗦𝗔𝗠𝗣𝗟𝗘 ]==\n
━━━━━━━━━━━━━━━━━━━━
𝟭. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗱𝗮̣𝗻𝗴 𝗻𝗲̂̀𝗻 𝗮𝗻𝗶𝗺𝗲 cute😻
𝟮. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗯𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱 đen⚫
𝟯. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝘂𝘀𝗲𝗿 𝗱𝗮̣𝗻𝗴 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 xanh⚪🔵
𝟰. 𝗕𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱 𝗰𝗵𝗶́𝗻𝗵 𝘁𝗿𝗮̆́𝗻𝗴 𝗽𝗵𝘂̣ 𝘅𝗮𝗻𝗵 🔵
𝟱. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗻𝗲̂̀𝗻 𝗰𝗵𝗶́𝗻𝗵 𝘁𝗶́𝗺 𝗽𝗵𝘂̣ xanh🟣 
𝟲. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗰𝗵𝘂̉ đ𝗲̂̀ 𝗮𝗻𝗶𝗺𝗲
𝟳. 𝗖𝗮𝗿𝗱𝗶𝗻𝗱𝗼 𝗻𝗲̂̀𝗻 𝗰𝗵𝗶́𝗻𝗵 𝘅𝗮𝗻𝗵 𝗹𝘂̣𝗰 𝗽𝗵𝘂̣ 𝘃𝗮̀𝗻𝗴🟡 
𝟴. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗻𝗲̂̀𝗻 𝗻𝗴𝗼𝗮̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗴𝗶𝗮𝗻 🌌
𝟵. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗯𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱 𝗻𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝗼̂𝗶 𝘀𝗮𝗼 ✨ 
𝟭𝟬. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗻𝗲̂̀𝗻 𝘁𝗲̂́𝘁 𝗺𝗮̀𝘂 𝘃𝗮̀𝗻𝗴 đ𝗼̉ 🧧
𝟭𝟭. 𝗶𝗻𝗳𝗼 🔫
𝟭𝟮. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝗺𝗮̀𝘂 𝗽𝗵𝘂̣ 𝗵𝗼̂̀𝗻𝗴 💗
𝟭𝟯. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗯𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱 𝗺𝗮́𝘆 𝗺𝗼́𝗰 🔗
𝟭𝟰. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗻𝗲̂̀𝗻 𝘁𝗿𝗮̆́𝗻𝗴 𝘅𝗮𝗻𝗵 ⚪🔵
𝟭𝟱. 𝗖𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝗮𝗿𝗱𝗶𝗻𝗳𝗼 𝘂𝘀𝗲𝗿𝘃𝟯 🍓
━━━━━━━━━━━━━━━━━━━━
🌐 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 chọ𝗻 `,
    attachment: image
};
return api.sendMessage(msg, threadID, (error, info) => {
      global.client.handleReply.push({
          type: "reply",
          name: this.config.name,
          author: senderID,
          messageID: info.messageID
            })
        },messageID)
  }

module.exports.handleReply = async function ({ event, api, handleReply
}) {
const fs = require("fs"), axios = require("axios");
api.sendMessage(`Đang khởi tạo hình ảnh, vui lòng chờ đợi trong giây lát`, event.threadID, (err, info) =>
setTimeout(() => {api.unsendMessage(info.messageID)} ,4000));
const { threadID, messageID, senderID } = event;
const send = function(msg, callback) {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };
switch (handleReply.type) {
    case "reply": {
    switch (event.body) {
        case '1': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { location, avatar, gender, birthday, follow, uid, link, name, relationship } = res.data.result;

            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (await axios.get(encodeURI(`https://imgur.com/kSfS1wX.png`), { responseType: "arraybuffer" })).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 50, 130, 270, 270);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#D3D3D3";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Full Name : ${name}`, 410, 172);
            ctx.fillStyle = "#99CCFF";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Gender: ${gender}`, 410, 208);
            ctx.fillStyle = "#FFFFE0";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Followers: ${follow}`, 410, 244);
            ctx.fillStyle = "#FFE4E1";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Relationship: ${relationship}`, 410, 281);
            ctx.fillStyle = "#9AFF9A";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Birthday: ${birthday}`, 410, 320);
            ctx.fillStyle = "#FF6A6A";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`Location: ${location.name}`, 410, 357);
            ctx.fillStyle = "#EEC591";
            ctx.textAlign = "start";
            fontSize = 22;
            ctx.fillText(`UID Facebook: ${uid}`, 410, 397);
            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#FFBBFF";
            ctx.textAlign = "start";
            fontSize = 23;
            ctx.fillText(`Link Facebook: ${link}`, 30, 450);
            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {body:`
            😻===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗖𝗨𝗧𝗘 」===😻
            ──────────────────
            👤 Tên: ${name}
            🎎 Giới tính: ${gender}
            🔰 Lượt Theo dõi: ${follow}
            💖 Mối quan hệ:  ${relationship}
            🎂 Sinh nhật: ${birthday}
            🌍 Vị trí: ${location.name}
            🔗 UID: ${uid}
            🌐 Link Fb: ${link}
            ──────────────────
            👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg)}
            send(msg);
          });
        } break;
        case '2': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const {
              link,
              name,
              gender,
              follow,
              relationship,
              birthday,
              location,
              hometown,
              uid,
              avatar
            } = res.data.result;

            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/rqbC4ES.jpg`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 910, 465, 229, 229);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#00FFFF";
            ctx.textAlign = "start";
            fontSize = 60;
            ctx.fillText(`Tên: ${name}`, 340, 560);
            ctx.fillText(`Giới tính: ${gender}`, 1245, 448);
            ctx.fillText(`Follow: ${follow}`, 1245, 505);
            ctx.fillText(`Mối quan hệ: ${relationship}`, 1245, 559);
            ctx.fillText(`Sinh nhật: ${birthday}`, 1245, 616);
            ctx.fillText(`Nơi ở: ${location.name}`, 1245, 668);
            ctx.fillText(`Quê hương: ${hometown.name}`, 1245, 723);
            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#FFCC33";
            ctx.textAlign = "start";
            fontSize = 60;
            ctx.fillText(`UID: ${uid}`, 840, 728);

            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
              🌸===「 𝗜𝗡𝗙𝗢 𝗖𝗔𝗥𝗗 」===🌸
              ──────────────────
              👤 Tên: ${name}
              🎎 Giới tính: ${gender}
              🔰 Lượt Theo dõi: ${follow}
              💖 Mối quan hệ: ${relationship}
              🎂 Sinh nhật: ${birthday}
              🌍 Vị trí: ${location.name}
              🔗 UID: ${uid}
              🌐 Link Fb: ${link}
              ──────────────────
              👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };
            send(msg);
          });
        } break;

        case '3': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { location, avatar, gender, birthday, love, follow, uid, link, name } = res.data.result;
            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/zET6S0F.png`), {
                responseType: "arraybuffer",
              })
            ).data;
            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 71, 65, 300, 300);

            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 50;
            ctx.fillText(`${gender}`, 555, 208);
            ctx.fillText(`${follow}`, 555, 244);
            ctx.fillText(`${love.name}`, 555, 281);
            ctx.fillText(`${birthday}`, 555, 320);
            ctx.fillText(`${location.name}`, 555, 357);
            ctx.fillText(`${uid}`, 555, 397);
            ctx.fillText(`${link}`, 180, 468);
            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 100;
            ctx.fillText(`Tên: ${name}`, 450, 170);
            ctx.beginPath();

            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
                🧸===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🧸
                ──────────────────
                👤 Tên: ${name}
                🎎 Giới tính: ${gender}
                🔰 Lượt Theo dõi: ${follow}
                💖 Mối quan hệ: ${love.name}
                🎂 Sinh nhật: ${birthday}
                🌍 Vị trí: ${location.name}
                🔗 UID: ${uid}
                🌐 Link Fb: ${link}
                ──────────────────
                👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };

            send(msg);
          });
        } break;

        case '4': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const {
              uid,
              name,
              gender,
              follow,
              love,
              birthday,
              location,
              link
            } = res.data.result;

            let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/C8yIgMZ.png`), {
                responseType: "arraybuffer",
              })
            ).data;
            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 610, 83, 255, 255);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 29;
            ctx.fillText(`${name}`, 111, 160);
            ctx.fillText(`${gender}`, 111, 320);
            ctx.fillText(`${follow}`, 111, 240);
            ctx.fillText(`${love.name}`, 111, 200);
            ctx.fillText(`${birthday}`, 111, 280);
            ctx.fillText(`${location.name}`, 111, 360);
            ctx.fillText(`${uid}`, 1010, 460);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`${link} `, 145, 470)
            ctx.beginPath();

            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `==「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥𝗩𝟮 」==
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follow}
        💖 Mối quan hệ: ${love.name}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location.name}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };

            send(msg);
          });
        } break;

        case '5': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { location, avatar, gender, birthday, love, follow, uid, link, name } = res.data.result;
            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (await axios.get(encodeURI(`https://i.imgur.com/8UaB48J.png`), {
              responseType: "arraybuffer",
            })).data;
            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 80, 73, 285, 285);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#00FFFF";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`» Tên Facebook: ${name}`, 455, 172);
            ctx.fillText(`» Giới tính: ${gender}`, 455, 208);
            ctx.fillText(`» Follow: ${follow}`, 455, 244);
            ctx.fillText(`» Mối quan hệ: ${love.name}`, 455, 281);
            ctx.fillText(`» Sinh nhật: ${birthday}`, 455, 320);
            ctx.fillText(`» Nơi ở: ${location.name}`, 455, 357);
            ctx.fillText(`» Quê hương: ${location.name}`, 455, 390);
            ctx.fillText(`» UID: ${uid}`, 455, 425);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#00FF33";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`» Profile: ${link}`, 19, 468);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`${link} `, 145, 470);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = { body: `
        ==「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥𝗩𝟯 」==
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follow}
        💖 Mối quan hệ: ${love.name}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location.name}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg) };
            send(msg);
          });
        } break;

        case '6': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { location, avatar, gender, birthday, follow, uid, link, name, relationship } = res.data.result;
            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (await axios.get(encodeURI(`https://i.imgur.com/AJdZtK9.jpg`), { responseType: "arraybuffer" })).data;
            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 910, 465, 229, 229);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "start";
            fontSize = 29;
            ctx.fillText(`${name}`, 640, 166);
            ctx.fillText(`Giới tính: ${gender}`, 590, 210);
            ctx.fillText(`Follow: ${follow}`, 590, 245);
            ctx.fillText(`Mối quan hệ: ${relationship}`, 590, 280);
            ctx.fillText(`Sinh nhật: ${birthday}`, 590, 320);
            ctx.fillText(`Nơi ở: ${location.name || 'N/A'}`, 590, 360);
            ctx.fillText(`UID: ${uid}`, 590, 400);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "start";
            fontSize = 29;
            ctx.fillText(`${uid}`, 0, 0);
            ctx.beginPath();
            ctx.font = `${fontsLink}px TUVBenchmark`;
            ctx.fillStyle = "#00FF00";
            ctx.textAlign = "start";
            fontSize = 29;
            ctx.fillText(`Profile: ${link}`, 41, 720);
            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`${link} `, 145, 470);
            ctx.beginPath();

            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `🎨==「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥𝗩𝟰 」==🎨
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follow}
        💖 Mối quan hệ: ${relationship}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location.name || 'N/A'}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };

            send(msg);
          });
        } break;

        case '7': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { location, avatar, gender, birthday, follow, uid, link, name, relationship } = res.data.result;
            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/ufsPjwE.png`), {
                responseType: "arraybuffer",
              })
            ).data;
            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 855, 70, 350, 350);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFCC33";
            ctx.textAlign = "start";
            fontSize = 30;
            ctx.fillText(`${name}`, 130, 130);
            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFCC33";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`>>  Giới tính:   ${gender}`, 70, 180);
            ctx.fillText(`>>  Follow:   ${follow}`, 70, 230);
            ctx.fillText(`>>  Mối quan hệ:   ${relationship}`, 70, 280);
            ctx.fillText(`>>  Ngày sinh:   ${birthday}`, 70, 330);
            ctx.fillText(`>>  UID:   ${uid}`, 70, 380);
            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "start";
            fontSize = 30;
            ctx.fillText(`Profile:  ${link}`, 50, 450);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
              ===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===
              ──────────────────
              👤 Tên: ${name}
              🎎 Giới tính: ${gender}
              🔰 Lượt Theo dõi: ${follow}
              💖 Mối quan hệ:  ${relationship}
              🎂 Sinh nhật: ${birthday}
              🌐 Link Fb: ${link}
              ──────────────────
              👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };
            send(msg);
          });
        } break;

        case '8': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { result } = res.data;
            const {
              uid,
              name,
              gender,
              follow,
              relationship,
              birthday,
              location,
              link,
            } = result;

            let getAvatarOne = (await axios.get(result.avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/kPDp0s7.jpg`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 45, 63, 290, 290);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#ffcc00";
            ctx.textAlign = "start";
            ctx.fillText(`Tên: ${name}`, 720, 230);
            ctx.fillText(`Giới tính:   ${gender}`, 720, 255);
            ctx.fillText(`Follow:   ${follow}`, 720, 280);
            ctx.fillText(`Mối quan hệ:   ${relationship}`, 720, 305);
            ctx.fillText(`Ngày sinh:   ${birthday}`, 720, 330);
            ctx.fillText(`UID:   ${uid}`, 720, 360);
            ctx.fillText(`Profile:   ${link}`, 620, 390);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#ffcc00";
            ctx.textAlign = "start";
            ctx.fillText(`  ${name}  `, 130, 385);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
        🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follow}
        💖 Mối quan hệ:  ${relationship}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg)
            };
            send(msg);
          })
        } break;

      case '9': {
        const fontsLink = 20;
        const fontsInfo = 28;
        const colorName = "#00FF00";
        const { loadImage, createCanvas } = require("canvas");
        const request = require('request');
        const fs = require("fs"), axios = require("axios");
        const Canvas = global.nodemodule["canvas"];
        let pathImg = __dirname + `/cache/${senderID}.png`;
        let pathAvata = __dirname + `/cache/avtuserrd.png`;

        axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
          const { location, avatar, gender, birthday, follow, uid, link, name, relationship } = res.data.result;

          let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
          let bg = (
            await axios.get(encodeURI(`https://i.imgur.com/fBgFUr8.png`), {
              responseType: "arraybuffer",
            })
          ).data;
          fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
          avataruser = await this.circle(pathAvata);
          fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

          let baseImage = await loadImage(pathImg);
          let baseAvata = await loadImage(avataruser);
          let canvas = createCanvas(baseImage.width, baseImage.height);
          let ctx = canvas.getContext("2d");
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(baseAvata, 100, 97, 255, 255);

          ctx.font = `${fontsInfo}px Play-Bold`;
          ctx.fillStyle = "#ffff";
          ctx.textAlign = "start";
          var fontSize = 20;

          ctx.fillText(`» Name: ${name}`, 455, 172);
          ctx.fillText(`» Sex: ${gender}`, 455, 208);
          ctx.fillText(`» Follow: ${follow}`, 455, 244);
          ctx.fillText(`» Relationship: ${relationship}`, 455, 281);
          ctx.fillText(`» Birthday: ${birthday}`, 455, 320);
          ctx.fillText(`» Location: ${location}`, 455, 357);
          ctx.fillText(`» UID: ${uid}`, 455, 397);

          ctx.font = `${fontsLink}px Play-Bold`;
          ctx.fillStyle = "#ffff";
          ctx.textAlign = "start";
          fontSize = 20;
          ctx.fillText(`» Profile: ${link}`, 19, 468);

          ctx.beginPath();
          const imageBuffer = canvas.toBuffer();
          fs.writeFileSync(pathImg, imageBuffer);

          var msg = { body: `
            🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
            ──────────────────
            👤 Tên: ${name}
            🎎 Giới tính: ${gender}
            🔰 Lượt theo dõi: ${follow}
            💖 Mối quan hệ: ${relationship}
            🎂 Sinh nhật: ${birthday}
            🌍 Vị trí: ${location}
            🔗 UID: ${uid}
            🌐 Link Fb: ${link}
            ──────────────────
            👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg)
          };
          send(msg);
        });
      } break;

        case '10': {
          const fontsLink = 20;
          const fontsInfo = 28;
          const colorName = "#00FF00";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const {
              location,
              avatar,
              gender,
              birthday,
              follow,
              uid,
              link,
              name,
              relationship,
            } = res.data.result;

            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/CECvNsj.jpg`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 50, 135, 270, 270);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFCC33";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`Tên: ${name}`, 600, 210);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#008844";
            ctx.textAlign = "start";
            fontSize = 15;
            ctx.fillText(`Giới tính:   ${gender}`, 540, 230);
            ctx.fillText(`Follow:   ${follow}`, 540, 250);
            ctx.fillText(`Mối quan hệ:   ${relationship}`, 540, 270);
            ctx.fillText(`Ngày sinh:   ${birthday}`, 540, 290);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#008844";
            ctx.textAlign = "start";
            fontSize = 15;
            ctx.fillText(`URL:  ${link}`, 560, 120);
            ctx.fillText(`UID:   ${uid}`, 560, 140);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
                🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
                ──────────────────
                👤 Tên: ${name}
                🎎 Giới tính: ${gender}
                🔰 Lượt Theo dõi: ${follow}
                💖 Mối quan hệ:  ${relationship}
                🎂 Sinh nhật: ${birthday}
                🌐 Vị trí: ${location}
                🔗 UID: ${uid}
                🌐 Link Fb: ${link}
                ──────────────────
                👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg),
            };
            send(msg);
          });
        } break;

        case '11': {
          const fontsName = 210;
          const fontsLink = 30;
          const fontsInfo = 190;
          const fontsUid = 190;
          const colorName = "#00FFFF";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const {
              uid,
              name,
              age,
              email,
              gender,
              follow,
              birthday,
              location,
              hometown,
              link,
              relationship,
              love,
              avatar
            } = res.data.result;

            let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/OfAgOKR.png`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 267, 628, 692, 692);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFCC33";
            ctx.textAlign = "start";
            fontSize = 30;

            ctx.font = `${fontsName}px Play-Bold`;
            ctx.fillStyle = "#00FF00";
            ctx.textAlign = "start";
            fontSize = 20;

            ctx.fillText(`${name}`, 1200, 260);
            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "start";
            fontSize = 20;

            ctx.fillText(`Giới tính: ${gender}`, 1505, 830);
            ctx.fillText(`Follow: ${follow}`, 1505, 1060);
            ctx.fillText(`Mối quan hệ: ${relationship}`, 1505, 1310);
            ctx.fillText(`Sinh nhật: ${birthday}`, 1505, 550);
            ctx.fillText(`Nơi ở: ${location.name}`, 1505, 1600);
            ctx.fillText(`Quê hương: ${hometown.name}`, 1505, 1850);

            ctx.font = `${fontsUid}px Play-Bold`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "start";
            fontSize = 20;
            ctx.fillText(`${uid}`, 1505, 2100);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
        🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follow}
        💖 Mối quan hệ:  ${relationship}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location.name}
        🌆 Quê hương: ${hometown.name}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };

            send(msg);
          });
        } break;

      case '12': {
        const fontsName = 35;
        const fontsLink = 30;
        const fontsInfo = 25;
        const fontsUid = 30;
        const colorName = "#00FFFF";
        const { loadImage, createCanvas } = require("canvas");
        const request = require('request');
        const fs = require("fs"), axios = require("axios");
        const Canvas = global.nodemodule["canvas"];
        let pathImg = __dirname + `/cache/${senderID}.png`;
        let pathAvata = __dirname + `/cache/avtuserrd.png`;

        axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
          const { location, avatar, gender, birthday, love, follow, uid, link, name, relationship } = res.data.result;
          let getAvatarOne = (await axios.get(avatar, { responseType: 'arraybuffer' })).data;
          let bg = (
            await axios.get(encodeURI(`https://i.imgur.com/Xa1ybRA.jpg`), {
              responseType: "arraybuffer",
            })
          ).data;
          fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
          avataruser = await this.circle(pathAvata);
          fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

          let baseImage = await loadImage(pathImg);
          let baseAvata = await loadImage(avataruser);
          let canvas = createCanvas(baseImage.width, baseImage.height);
          let ctx = canvas.getContext("2d");
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(baseAvata, 44, 150, 157, 157);

          ctx.font = `${fontsName}px Play-Bold`;
          ctx.fillStyle = "#FF0000";
          ctx.textAlign = "start";
          fontSize = 20;
          ctx.fillText(`${name}`, 172, 100);
          ctx.font = `${fontsInfo}px Play-Bold`;
          ctx.fillStyle = "#000000";
          ctx.textAlign = "start";
          fontSize = 20;
          ctx.fillText(`Giới tính: ${gender}`, 260, 217);
          ctx.fillText(`Follow: ${follow}`, 260, 257);
          ctx.fillText(`Mối quan hệ: ${relationship}`, 260, 295);
          ctx.fillText(`Sinh nhật: ${birthday}`, 260, 177);
          ctx.fillText(`Nơi ở: ${location.name}`, 260, 333);
          ctx.fillText(`Quê hương: ${location.name}`, 260, 372);
          ctx.font = `${fontsUid}px Play-Bold`;
          ctx.fillStyle = "#000033";
          ctx.textAlign = "start";
          fontSize = 20;
          ctx.fillText(`${uid}`, 197, 423);

          ctx.beginPath();
          const imageBuffer = canvas.toBuffer();
          fs.writeFileSync(pathImg, imageBuffer);

          var msg = {
            body: `
      🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
      ──────────────────
      👤 Tên: ${name}
      🎎 Giới tính: ${gender}
      🔰 Lượt Theo dõi: ${follow}
      💖 Mối quan hệ:  ${relationship}
      🎂 Sinh nhật: ${birthday}
      🌍 Vị trí: ${location.name}
      🔗 UID: ${uid}
      🌐 Link Fb: ${link}
      ──────────────────
      👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
            attachment: fs.createReadStream(pathImg)
          };
          send(msg);
        });
      } break;

      case '13': {
          const fontsLink = 5;
          const fontsInfo = 30;
          const colorName = "#000000";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { result } = res.data;
            const { uid, name, gender, follow, relationship, birthday, location, link } = result;

            let getAvatarOne = (await axios.get(result.avatar, { responseType: 'arraybuffer' })).data;
            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/nX5W2Ru.jpg`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 1100, 550, 400, 400);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#00bbff";
            ctx.textAlign = "start";
            fontSize = 25;
           // ctx.fillText(`Name: ${name}`, 150, 122);
          //  ctx.fillText(`Gender: ${gender}`, 150, 132);
          //  ctx.fillText(`Followers: ${follow}`, 150, 142);
          //  ctx.fillText(`Relationship: ${relationship}`, 150, 152);
         //   ctx.fillText(`Birthday: ${birthday}`, 150, 162);
         //   ctx.fillText(`Location: ${location.name}`, 150, 172);
         //   ctx.fillText(`UID: ${uid}`, 150, 182);

            ctx.font = `${fontsLink}px Play-Bold`;
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "start";
            fontSize = 20;
         //   ctx.fillText(`${link} `, 180, 468);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = {
              body: `
                🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
                ──────────────────
                👤 Tên: ${name}
                🎎 Giới tính: ${gender}
                🔰 Lượt Theo dõi: ${follow}
                💖 Mối quan hệ:  ${relationship}
                🎂 Sinh nhật: ${birthday}
                🌍 Vị trí: ${location.name}
                🔗 UID: ${uid}
                🌐 Link Fb: ${link}
                ──────────────────
                👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`,
              attachment: fs.createReadStream(pathImg)
            };

            send(msg);
          });
        } break;


        case '14': {
          const fontsLink = 40;
          const Name = 52;
          const fontsInfo = 50;
          const colorName = "#00FFFF";
          const { loadImage, createCanvas } = require("canvas");
          const request = require('request');
          const fs = require("fs"), axios = require("axios");
          const Canvas = global.nodemodule["canvas"];
          let pathImg = __dirname + `/cache/${senderID}.png`;
          let pathAvata = __dirname + `/cache/avtuserrd.png`;

          axios.get(encodeURI(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/facebook/info?uid=${senderID}`)).then(async (res) => {
            const { uid, name, gender, follower, relationship_status, birthday, location, link } = res.data.result;
            let getAvatarOne = (await axios.get(res.data.result.avatar, { responseType: 'arraybuffer' })).data;

            let bg = (
              await axios.get(encodeURI(`https://i.imgur.com/TFbVhfN.jpg`), {
                responseType: "arraybuffer",
              })
            ).data;

            fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
            avataruser = await this.circle(pathAvata);
            fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

            let baseImage = await loadImage(pathImg);
            let baseAvata = await loadImage(avataruser);
            let canvas = createCanvas(baseImage.width, baseImage.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseAvata, 82, 305, 479, 479);

            ctx.font = `${fontsInfo}px Play-Bold`;
            ctx.fillStyle = "#110000";
            ctx.textAlign = "start";
            fontSize = 390;
            ctx.fillText(`: ${follower}`, 827, 720);
            ctx.fillText(`: ${relationship_status}`, 1005, 642);
            ctx.fillText(`: ${birthday}`, 1005, 812);
            ctx.fillText(`: ${location.name}`, 959, 552);
            ctx.fillText(`: ${location.name}`, 918, 462);
            ctx.fillText(`» UID: ${uid}`, 215, 868);
            ctx.font = `${Name}px Play-Bold`;
            ctx.fillStyle = "#003300";
            ctx.textAlign = "start";
            fontSize = 390;
            ctx.fillText(` ${name} `, 682, 375);
            ctx.beginPath();
            ctx.font = `${fontsLink}px ArialUnicodeMS`;
            ctx.fillStyle = "#FF0000";
            ctx.textAlign = "start";
            fontSize = 390;
            ctx.fillText(` ${link}`, 323, 918);

            ctx.beginPath();
            const imageBuffer = canvas.toBuffer();
            fs.writeFileSync(pathImg, imageBuffer);

            var msg = { body: `
        🎨===「 𝗖𝗔𝗥𝗗𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」===🎨
        ──────────────────
        👤 Tên: ${name}
        🎎 Giới tính: ${gender}
        🔰 Lượt Theo dõi: ${follower}
        💖 Mối quan hệ:  ${relationship_status}
        🎂 Sinh nhật: ${birthday}
        🌍 Vị trí: ${location.name}
        🔗 UID: ${uid}
        🌐 Link Fb: ${link}
        ──────────────────
        👉 Tạo thành công cardinfo cho bạn, bạn có thể thử nhiều mẫu khác.`, attachment: fs.createReadStream(pathImg) };
            send(msg);
          });
        } break;

          default:
           const choose = parseInt(event.body);
              if (isNaN(event.body)) return api.sendMessage("Vui lòng nhập 1 con số", event.threadID, event.messageID);
              if (choose > 14 || choose < 1) return api.sendMessage("Lựa chọn không nằm trong danh sách", event.threadID, event.messageID); 
/////////////////////////////////////
   }
  }
 }
}