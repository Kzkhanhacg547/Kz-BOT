module.exports.config = {
  name: 'l2',
  version: '1.0.0',
  credits: 'Vtuan',
  Rent: 2,
  hasPermssion: 1,
  description: '[No]',
  commandCategory: 'Admin',
  usages: '[]',
  cooldowns: 0
};

const fs = require('fs-extra');
const path = require('path');
const filepath = path.join(__dirname, 'cache/data/messageCounts');

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100081129610697"];
  if (!permission.includes(event.senderID)) return api.sendMessage( "Cúc" , event.threadID, event.messageID);
  try {
    const jsonFiles = await fs.readdir(filepath);

    const groupsInfo = [];
    let totalMessages = 0;

    for (const jsonFile of jsonFiles) {
      const file = path.join(filepath, jsonFile);
      const { data } = await fs.readFile(file, 'utf-8').then(JSON.parse).catch(error => ({ data: [] }));

      const groupName = jsonFile.replace('.json', '');
      const fulltt = data.reduce((acc, user) => acc + user.count, 0);
      totalMessages += fulltt;

      groupsInfo.push({ threadID: groupName, totalMessages: fulltt });
    }

    const inbox = await api.getThreadList(100, null, ['INBOX']);
    const checkgr = inbox.filter(group => group.isSubscribed && group.isGroup).map((group, index) => {
      const groupName = group.name || 'Không tên';
      const stt = index + 1;
      const fulltv = group.participantIDs.length;
      const idnhom = group.threadID;

      const foundGroup = groupsInfo.find(g => g.threadID === group.threadID);
      const fulltt = foundGroup ? foundGroup.totalMessages : 0;

      return { stt, groupName, idnhom, fulltv, fulltt };
    });
    let msgs = `\n\n reply ban/unban/thamgia/del/out + stt để thực thi lệnh`
    await api.sendMessage(
      checkgr.map(group => `⩥ ${group.stt}. ${group.groupName}\n⩥ ID Nhóm: ${group.idnhom}\n⩥ Số thành viên: ${group.fulltv}\n⩥ Tổng tin nhắn: ${group.fulltt}\n—————————————`).join('\n') + ' ' + msgs,
      event.threadID,
      (error, info) => !error && global.client.handleReply.push({ name: module.exports.config.name, messageID: info.messageID, author: event.senderID, checkgr })
    );
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports.handleReply = async ({ api, event, args, Threads, handleReply }) => {
  const { threadID, body, senderID } = event;
  const { checkgr, author } = handleReply;
  if (senderID != author) return api.sendMessage(`Cút`, threadID);
  var args = body.split(' ');

  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");

  if (args[0].toLowerCase() === 'ban' || args[0].toLowerCase() === 'unban' || args[0].toLowerCase() === 'out') {
    const action = args[0].toLowerCase();
    const numm = args.slice(1).map(num => parseInt(num));

    for (const num of numm) {
      if (num >= 1 && num <= checkgr.length) {
        const groupIndex = num - 1;
        const idnhom = checkgr[groupIndex].idnhom;
        const threadName = checkgr[groupIndex].groupName;
        const data = (await Threads.getData(idnhom)).data || {};

        if (action === 'ban') {
          data.banned = true;
          data.dateAdded = time;
          global.data.threadBanned.set(idnhom, { dateAdded: data.dateAdded });
        } else if (action === 'unban') {
          data.banned = false;
          data.dateAdded = null;
          global.data.threadBanned.delete(idnhom, 1);
        } else if (action === 'out') {
          api.removeUserFromGroup(`${api.getCurrentUserID()}`, idnhom);
        }

        await Threads.setData(idnhom, { data });

        api.sendMessage(`${action === 'out' ? 'Out' : action === 'ban' ? 'Ban' : 'Unban'} thành công nhóm: ${threadName}`, threadID);
        api.sendMessage(`⟦ ${action === 'out' ? 'Out' : action === 'ban' ? 'Ban' : 'Unban'} Thread ⟧\n⪼ Nhóm tên: ${threadName}\n⪼ ID: ${idnhom}\n‣ ${action === 'out' ? 'Tớ out đây' : action === 'ban' ? 'Đã bị ban' : 'Đã đươc Unban'}`, idnhom);
      } else {
        api.sendMessage(`❌ Số thứ tự ${num} không hợp lệ`, threadID);
      }
    }
  } else if (args[0].toLowerCase() === 'thamgia') {
    const numm = args.slice(1).map(num => parseInt(num));

    for (const num of numm) {
      if (num >= 1 && num <= checkgr.length) {
        const groupIndex = num - 1;
        const idnhom = checkgr[groupIndex].idnhom;
        const threadName = checkgr[groupIndex].groupName;

        const threadInfo = await api.getThreadInfo(idnhom);
        const participantIDs = threadInfo.participantIDs;

        if (participantIDs.includes(senderID)) {
          api.sendMessage(`Bạn đã có mặt trong nhóm ${threadName}.`, threadID);
        } else {
          api.addUserToGroup(senderID, idnhom, (e) => {
            if (!e) {
              api.sendMessage(`Tham gia nhóm thành công: ${threadName}`, threadID);
            } else {
              api.sendMessage(`Đã có lỗi xảy ra khi tham gia nhóm: ${threadName}`, threadID);
            }
          });
        }
      } else {
        api.sendMessage(`❌ Số thứ tự ${num} không hợp lệ`, threadID);
      }
    }
  } else if (args[0].toLowerCase() === 'del') {
    const numm = args.slice(1);
    if (numm.includes('all')) {
      if (fs.existsSync(filepath)) {
        fs.emptyDir(filepath, (error) => {
          if (error) {
            console.error('Lỗi khi xóa toàn bộ dữ liệu:', error);
            api.sendMessage('Xảy ra lỗi khi xóa toàn bộ dữ liệu.', threadID);
          } else {
            api.sendMessage('Đã xóa toàn bộ dữ liệu.', threadID);
          }
        });
      } else {
        console.error('Thư mục không tồn tại:', filepath);
        api.sendMessage('Thư mục không tồn tại.', threadID);
      }
    } else {
      const numericValues = numm.map(num => parseInt(num));
      for (const num of numericValues) {
        if (num >= 1 && num <= checkgr.length) {
          const groupIndex = num - 1;
          const idnhom = checkgr[groupIndex].idnhom;
          const threadName = checkgr[groupIndex].groupName;
          const groupDataPath = path.join(filepath, `${idnhom}.json`);
          if (fs.existsSync(groupDataPath)) {
            fs.unlink(groupDataPath, (error) => {
              if (error) {
                console.error('Lỗi khi xóa tệp dữ liệu:', error);
                api.sendMessage(`Xảy ra lỗi khi xóa tệp dữ liệu cho nhóm ${threadName}.`, threadID);
              } else {
                api.sendMessage(`Đã xóa thành công tệp dữ liệu cho nhóm ${threadName}.`, threadID);
              }
            });
          } else {
            console.error('Tệp không tồn tại:', groupDataPath);
            api.sendMessage(`Tệp không tồn tại cho nhóm ${threadName}.`, threadID);
          }
        } else {
          api.sendMessage(`❌ Số thứ tự ${num} không hợp lệ`, threadID);
        }
      }
    }
  }
}