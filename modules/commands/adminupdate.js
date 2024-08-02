module.exports.config = {
  name: "adminupdate",
  version: "1.1.1",
  hasPermssion: 1,
  credits: "DC-Nam",
  description: "Bật/tắt chống out chùa",
  commandCategory: "Box",
  usages: "",
  cooldowns: 0
}
module.exports.run = async function({
  api: a,
  event: e,
  args: g,
  Threads: T
}) {
  const {
      threadID: t,
      messageID: m,
      senderID: s
  } = e
  let getDataThread = await T.getData(t) || {}
  const {
      data,
      threadInfo
  } = getDataThread
  if (typeof data.threadUpdate == "undefined") {
      data.threadUpdate = {
          status: true,
          send: true,
          unsend: true,
          timeout: 10,
          storage: []
      }
      await T.setData(t, {
          data
      });
      await global.data.threadData.set(t, data)
  }
  var msg = `📢 CÀI ĐẶT THÔNG BÁO CẬP NHẬT NHÓM 📢\n━━━━━━━━━━━━━━━━━━\n\n1. Hiển thị thông báo cập nhật nhóm (Hiện tại: ${data.threadUpdate.send == true ? "Bật" : "Tắt"})\n2. Tự động xóa thông báo cập nhật nhóm (Hiện tại: ${data.threadUpdate.unsend == true ? "Bật" : "Tắt"})\n3. Thời gian xóa thông báo (Hiện tại: ${data.threadUpdate.timeout} giây)\n\n━━━━━━━━━━━━━━━━━━\n➤ Phản hồi với số thứ tự để thay đổi cài đặt`
  a.sendMessage(msg, t, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: s
    })
  }, m)
}
module.exports.handleReply = async function ({ api: a, event: e, handleReply: h, Threads: T }) {
const { threadID: t, messageID: m, senderID: s, body: y } = e
let getDataThread = await T.getData(t) || {}
  const {
      data,
      threadInfo
  } = getDataThread
var msg = ""
const arr = y.split(" ")
if (arr[0] == "1") {
  const status = data.threadUpdate.send == true ? false : true
  data.threadUpdate.send = status
  await T.setData(t, {
      data
  });
  await global.data.threadData.set(t, data)
  msg = `➝ Đã ${status == true ? "bật" : "tắt"} thông báo cập nhật nhóm`
  a.sendMessage(msg, t, m)
}
if (arr[0] == "2") {
  const status = data.threadUpdate.unsend == true ? false : true
  data.threadUpdate.unsend = status
  await T.setData(t, {
      data
  });
  await global.data.threadData.set(t, data)
  msg = `➝ Đã ${status == true ? "bật" : "tắt"} tự động unsend thông báo cập nhật nhóm`
  a.sendMessage(msg, t, m)
}
if (arr[0] == "3") {
  data.threadUpdate.timeout = parseInt(arr[1])
  await T.setData(t, {
      data
  });
  await global.data.threadData.set(t, data)
  msg = `➝ Đã đặt thời gian tự unsend thông báo cập nhật nhóm là ${arr[1]}s`
  a.sendMessage(msg, t, m)
    }
    }