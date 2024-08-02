let axios = require('axios')
let fs = require('fs')
let cc = require('moment-timezone')

const allowedPairs = {};

module.exports.config = {
  name: "sendmsg",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Trúc mod by Ryo",
  description: "Success",
  commandCategory: "Admin",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs": "",
    "axios": "",
    "moment-timezone": ""
  }
}

let gio = cc.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss - DD/MM/YYYY')

module.exports.run = async ({ api, event, handleReply, Users, args }) => {
  let { threadID, messageID, senderID, type, messageReply } = event;
  let name = await Users.getNameUser(senderID)
  let threadInfo = await api.getThreadInfo(args[0])
  let NameText = threadInfo.threadName || await Users.getNameUser(args[0])
  let lydo = args.splice(1).join(" ")

  const pairKey = `${senderID}_${args[0]}`;
  if (!allowedPairs[pairKey] && !allowedPairs[`${args[0]}_${senderID}`]) {
    api.sendMessage("Bạn không được phép nhắn tin cho người này.", threadID);
    return;
  }
  
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
  if (type == "message_reply") {
    if (messageReply.attachments[0].type == "audio") {
      path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
    }
    if (messageReply.attachments[0].type == "photo") {
      path = __dirname + `/cache/snoti.jpg`
    }
    if (messageReply.attachments[0].type == "video") {
      path = __dirname + `/cache/snoti.mp4`
    }
    if (messageReply.attachments[0].type == "animated_image") {
      path = __dirname + `/cache/snoti.gif`
    }
    let abc = messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, {
      responseType: 'arraybuffer'
    })).data
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
    api.sendMessage({body: `${lydo}`, attachment: fs.createReadStream(path)}, args[0], (e, info) => {
      global.client.handleReply.push({
        type: "callad",
        name: this.config.name,
        author: threadID,
        ID: messageID,
        messageID: info.messageID
      })
    })
    api.sendMessage(`Đã gửi thành công tin nhắn đến ${NameText}`, threadID)
  } else {
    api.sendMessage({body: `${lydo}`}, args[0], (e, info) => {
      global.client.handleReply.push({
        type: "callad",
        name: this.config.name,
        author: threadID,
        ID: messageID,
        messageID: info.messageID
      })
    })
    api.sendMessage(`→ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 𝐆𝐮̛̉𝐢 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐑𝐢𝐞̂𝐧𝐠 𝐂𝐡𝐨 𝐁𝐨𝐱 ${NameText}`, threadID)
  }
}

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
        api.sendMessage({body: `${index.join(" ")}`, attachment: fs.createReadStream(path)}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
        }, handleReply.ID)
      } else if (index.length != 0) {
        api.sendMessage({body:` ${index.join(" ")}`}, handleReply.author, (e, info) => {
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