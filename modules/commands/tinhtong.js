const config = { 
  name: "test", 
  version: "1.0.0", 
  hasPermission: 0, 
  Rent: 1, 
  credits: "Vtuandz", 
  description: "abc", 
  commandCategory: "Quản Trị Viên", 
  usages: "boxinfo", 
  cooldowns: 0 
};

const run = async ({ api, event }) => {
  const num = Array.from({ length: 9 }, (_, i) => i + 1);
  api.sendMessage(num.join('\n'), event.threadID, (error, info) => {
    if (error) console.error(error);
    global.client.handleReply.push({ name: config.name, messageID: info.messageID, ad: event.senderID, num, type: "requireInput" });
  });
};

const handleReply = async ({ event, api, handleReply }) => {
  const { num, ad, name } = handleReply;

  if (event.senderID != ad) return api.sendMessage("Cút", event.threadID, event.messageID);

  switch (handleReply.type) {
    case "requireInput": {
      const soDaChon = num[parseInt(event.body) - 1];

      if (soDaChon) {
        await api.sendMessage(`Số đã chọn: ${soDaChon}`, event.threadID);
        const info = await api.sendMessage("Reply tin nhắn này để biết tổng", event.threadID);
        global.client.handleReply.push({ type: "getSum", name, ad, num, selectedNumber: soDaChon, messageID: info.messageID });
      } else {
        await api.sendMessage("Số bạn nhập không hợp lệ!", event.threadID);
      }
      break;
    }

    case "getSum": {
      const { num, ad, selectedNumber } = handleReply;
      const tong = num.slice(0, selectedNumber).reduce((acc, curr) => acc + curr, 0);
      await api.sendMessage(`Tổng từ 1 đến ${selectedNumber} là: ${tong}`, event.threadID);
      break;
    }

    default:
      break;
  }
};

module.exports = { config, run, handleReply };