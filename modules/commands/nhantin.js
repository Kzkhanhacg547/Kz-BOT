const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingThreads.json";

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}

function isApproved(id) {
  const approvedData = JSON.parse(fs.readFileSync(dataPath));
  return approvedData.includes(id);
}

module.exports.config = {
  name: "nhantin",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "Vtuan", //Mod By Kz
  description: "Gửi tin nhắn tới một người dùng qua ID Facebook",
  commandCategory: "Tiện ích",
  usages: "[userID] [noidung]\nBạn có thể reply file (ảnh, video, âm thanh, tài liệu, vv.) hoặc nhập nội dung trực tiếp",
  cooldowns: 10
};

function getAttachmentPath(attachmentType) {
  const extensions = {
    audio: 'm4a',
    photo: 'jpg',
    video: 'mp4',
    animated_image: 'gif'
  };

  return extensions[attachmentType] ? `attachment_${Date.now()}.${extensions[attachmentType]}` : null;
}

async function downloadAndSendFile(api, url, content, targetID, isReply) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const fileExtension = mime.extension(response.headers['content-type']);
    const fileName = `attachment_${Date.now()}.${fileExtension || 'txt'}`;
    const filePath = path.join(__dirname, 'cache', fileName);

    fs.writeFileSync(filePath, Buffer.from(response.data));

    api.sendMessage({ attachment: fs.createReadStream(filePath), body: content }, targetID, (e, info) => {
      if (isReply) {
        global.client.handleReply.push({
          type: "callad",
          name: "sendmsg",
          author: targetID,
          ID: info.messageID,
          messageID: info.messageID,
          attachmentPath: filePath
        });
      }
    });

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error downloading or sending file:', error);
  }
}


module.exports.run = async ({ api, event, handleReply, Users, args }) => {
  const { threadID, messageID, senderID, type, messageReply } = event;
  const name = await Users.getNameUser(senderID);
  const threadInfo = await api.getThreadInfo(args[0]);
  const NameText = threadInfo.threadName || await Users.getNameUser(args[0]);
  const contentArgs = args.slice(1);
  const content = contentArgs.length !== 0 ? contentArgs.join(" ") : "Hi chao cau";

  if (threadInfo.isGroup) {
    if (threadInfo.adminIDs.includes(senderID)) {
    } else {
      if (args[0] === senderID || args[0] === threadID) {
        api.sendMessage("Tính ra mày đang ở thread này luôn đấy Em", threadID);
        return;
      }
    }
  } else {
    if (args[0] === senderID || args[0] === threadID) {
      api.sendMessage("Tự kỷ à Em!\nSao lại tự nhắn tin cho bản thân thế?", threadID);
      return;
    }
  }

  if (isApproved(args[0])) {
    if (type === "message_reply" && messageReply.attachments.length > 0) {
      const attachmentType = messageReply.attachments[0].type;
      const attachmentPath = getAttachmentPath(attachmentType);

      if (attachmentPath) {
        const abc = messageReply.attachments[0].url;
        const getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

        fs.writeFileSync(path.join(__dirname, 'cache', attachmentPath), Buffer.from(getdata, 'utf-8'));

        downloadAndSendFile(api, abc, `${content}`, args[0], false);
      }
    } else {
      api.sendMessage({ body: `${content}` }, args[0], (e, info) => {
        global.client.handleReply.push({
          type: "callad",
          name: this.config.name,
          author: threadID,
          ID: messageID,
          messageID: info.messageID
        });
      });
    }
  } else {
    api.sendMessage(`ID chưa được phê duyệt, vui lòng duyệt ID bằng cú pháp '${global.config.PREFIX}duyet <ID>'.`, threadID, messageID);
  }
};





module.exports.handleReply = async ({ api, event, handleReply, Users }) => {
  let { body, threadID, senderID, messageID } = event;
  let index = body.split(" ")
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:ss")
  let threadInfo = await api.getThreadInfo(threadID)
  let threadName = threadInfo.threadName || await Users.getNameUser(senderID)
  switch(handleReply.type) {
    case "callad": {
      let name = await Users.getNameUser(senderID)
      if (event.attachments.length != 0) {
        if (event.attachments[0].type == "audio") {
    path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
  }
  if (event.attachments[0].type == "photo") {
    path = __dirname + `/cache/snoti.jpg`
  }
  if (event.attachments[0].type == "video") {
    path = __dirname + `/cache/snoti.mp4`
  }
  if (event.attachments[0].type == "animated_image") {
    path = __dirname + `/cache/snoti.gif`
  }
        let abc = event.attachments[0].url;
  let getdata = (await axios.get(`${abc}`, {
    responseType: 'arraybuffer'
  })).data
  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
        api.sendMessage({body: `『 ꨄ𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻ꨄ 』\n━━━━━━━━━━━━━━━\n→ ➥𝐍𝐨̛𝐢 𝐠𝐮̛̉𝐢: ${threadName}\n→ 👤𝐏𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢 𝐭𝐮̛̀ 𝐚𝐝𝐦𝐢𝐧 đ𝐞̂́𝐧 𝐛𝐚̣𝐧: ${name}\n━━━━━━━━━━━━━━━\n→ 💬𝐍𝐨̣̂𝐢 𝐃𝐮𝐧𝐠: ${index.join(" ")}\n━━━━━━━━━━━━━━━\n→ [⏰️] 𝐕𝐚̀𝐨 𝐋𝐮́𝐜: ${gio}`, attachment: fs.createReadStream(path)}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
        }, handleReply.ID)
      } else if (index.length != 0) {
        api.sendMessage({body:`『 ꨄ𝗣𝗵𝗮̉𝗻 𝗛𝗼̂̀𝗶ꨄ 』\n━━━━━━━━━━━━━━━\n→ ➥𝐍𝐨̛𝐢 𝐠𝐮̛̉𝐢: ${threadName}\n→ 👤𝐏𝐡𝐚̉𝐧 𝐇𝐨̂̀𝐢 𝐓𝐮̛̀: ${name}\n━━━━━━━━━━━━━━━\n→ 💬𝐍𝐨̣̂𝐢 𝐃𝐮𝐧𝐠: ${index.join(" ")}\n━━━━━━━━━━━━━━━\n→ [⏰️] 𝐕𝐚̀𝐨 𝐋𝐮́𝐜: ${gio}`}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
        }, handleReply.ID)
      }
    }
  }
  }








module.exports.handleReply = async ({ api, event, handleReply, Users }) => {
  const { body, threadID, senderID, messageID, attachments } = event;
  const index = body.split(" ");

  switch (handleReply.type) {
    case "callad": {
      const name = await Users.getNameUser(senderID);
      let filePath = '';

      if (attachments.length !== 0) {
        const attachmentType = attachments[0].type;
        const attachmentPath = getAttachmentPath(attachmentType);
      
        if (attachmentPath) {
          const abc = attachments[0].url;
          const getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
          filePath = path.join(__dirname, 'cache', attachmentPath);
          fs.writeFileSync(filePath, Buffer.from(getdata, 'utf-8'));
        }
      }

      const params = {
        body: `${index.join(" ")}`,
        attachment: filePath ? fs.createReadStream(filePath) : null
      };

      if (isApproved(threadID)) {
        api.sendMessage(params, handleReply.author, (e, info) => {
          global.client.handleReply.push({
            type: "callad",
            name: this.config.name,
            author: threadID,
            ID: messageID,
            messageID: info.messageID,
            attachmentPath: filePath
          });
        }, handleReply.ID);
      } else {
        api.sendMessage(`ID chưa được phê duyệt, vui lòng duyệt ID bằng cú pháp '${global.config.PREFIX}duyet <ID>'.`, threadID, messageID);
      }

      if (filePath) {
        fs.unlinkSync(filePath);
      }

      break;
    }
  }
};

