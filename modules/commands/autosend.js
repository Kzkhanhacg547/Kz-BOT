const axios = require('axios');
const fs = require('fs-extra');
const moment = require("moment-timezone");

module.exports.config = {
  name: 'autosend',
  version: '2.0.4',
  hasPermission: 2,
  credits: '',
  description: 'Automatically sends messages at specified times!',
  commandCategory: 'System',
  usages: '[]',
  cooldowns: 3
};

module.exports.onLoad = apiContext => {
  if (global.autoSendMessageInterval) clearInterval(global.autoSendMessageInterval);

  global.autoSendMessageInterval = setInterval(async () => {
    const currentTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const currentHour = moment.tz("Asia/Ho_Chi_Minh").format("HH");

    // Check if it's 00 or 30 minutes within the hour
    if (currentTime === `${currentHour}:00:00` || currentTime === `${currentHour}:30:00`) {
      const apiUrl = "https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/girl";
      const messageCountOptions = ["1", "2", "3", "4"];
      const attachments = [];

      const randomIndex = Math.floor(Math.random() * messageCountOptions.length);
      const messageCount = parseInt(messageCountOptions[randomIndex]);

      for (let i = 0; i < messageCount; i++) {
        try {
          const response = await axios.get(apiUrl);
          const imageUrl = response.data.data;
          const imageStream = (await axios.get(imageUrl, { responseType: 'stream' })).data;
          attachments.push(imageStream);
        } catch (error) {
          console.error(`Error fetching image: ${error.message}`);
        }
      }

      try {
        const thinhResponse = await axios.get('https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/thinh');
        const thinh = thinhResponse.data.data;

        const message = {
          body: `\n『 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐂𝐨̣̂𝐧𝐠 Đ𝐨̂̀𝐧𝐠 』\n—————————————————————————\n\n𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧\n⏰ Hiện tại: ${currentTime}\n —————————————————————————\n\n 𝐇𝐨𝐚̣𝐭 Đ𝐨̣̂𝐧𝐠 𝐂𝐨̣̂𝐧𝐠 Đ𝐨̂̀𝐧𝐠\n🤖 Chia sẻ bot hỗ trợ cộng đồng\n💡 Trao đổi kiến thức lập trình\n—————————————————————————\n\n𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ & 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜\n👤 Quản trị viên: fb.com/kzkhanh547\n💬 Câu thính: ${thinh}\n—————————————————————————\n\n𝘊𝘩𝘶́𝘯𝘨 𝘵𝘰̂𝘪 𝘵𝘢̣̂𝘱 𝘵𝘳𝘶𝘯𝘨 𝘷𝘢̀𝘰 𝘷𝘪𝘦̣̂𝘤 𝘹𝘢̂𝘺 𝘥𝘶̛̣𝘯𝘨 𝘤𝘰̣̂𝘯𝘨 đ𝘰̂̀𝘯𝘨 𝘷𝘢̀ 𝘤𝘩𝘪𝘢 𝘴𝘦̉ 𝘬𝘪𝘦̂́𝘯 𝘵𝘩𝘶̛́𝘤. 𝘔𝘰̣𝘪 𝘩𝘰𝘢̣𝘵 đ𝘰̣̂𝘯𝘨 đ𝘦̂̀𝘶 𝘱𝘩𝘪 𝘭𝘰̛̣𝘪 𝘯𝘩𝘶𝘢̣̂𝘯 𝘷𝘢̀ 𝘩𝘶̛𝘰̛́𝘯𝘨 đ𝘦̂́𝘯 𝘴𝘶̛̣ 𝘱𝘩𝘢́𝘵 𝘵𝘳𝘪𝘦̂̉𝘯 𝘤𝘩𝘶𝘯𝘨 𝘤𝘶̉𝘢 𝘤𝘰̣̂𝘯𝘨 đ𝘰̂̀𝘯𝘨.`,
          attachment: attachments
        };

        global.data.allThreadID.forEach(threadID => apiContext.api.sendMessage(message, threadID));
      } catch (error) {
        console.error(`Error fetching thinh: ${error.message}`);
      }
    }
  }, 1000);
};

module.exports.run = () => { };
