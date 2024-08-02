const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'linkapi+',
    commandCategory: 'Tiện ích',
    hasPermission: 0,
    credits: 'Kz Khánhh',
    usages: 'api + reply [đường_dẫn_lưu_link]',
    description: 'lấy link catbox',
    cooldowns: 0
  },

 run: async (o) => {
    let send = (msg) => o.api.sendMessage(msg, o.event.threadID, o.event.messageID),
      msgArray = [];

    if (o.event.type !== "message_reply") return send("⚠️ Hình ảnh không hợp lệ, vui lòng phản hồi một video, ảnh nào đó");

   for (let i of o.event.messageReply.attachments) {
     try {
       const response = await require('axios').get(`https://catbox-mnib.onrender.com/upload?url=${encodeURIComponent(i.url)}`);
       msgArray.push(response.data.url);
     } catch (error) {
       console.error('Error uploading attachment:', error);
     }
   }


    let filePath = path.join(__dirname, 'Kz-API', '1.json');

    // Kiểm tra xem người dùng đã nhập đường dẫn lưu link hay chưa
    if (o.args.length > 0) {
      const userSpecifiedPath = o.args[0];
      filePath = path.join(__dirname, 'Kz-API', userSpecifiedPath);
    }

    // Kiểm tra đuôi mở rộng của file để quyết định cách ghi
    const fileExtension = path.extname(filePath);
    let fileContent = '';

    if (fileExtension === '.json') {
      // Đọc nội dung hiện tại của file JSON
      let existingData = [];
      try {
        const existingContent = fs.readFileSync(filePath, 'utf8');
        existingData = JSON.parse(existingContent);
      } catch (error) {
        // Xử lý lỗi đọc file (có thể là file không tồn tại hoặc có nội dung không phải JSON)
      }

      // Nối thêm link mới vào mảng hiện tại
      existingData.push(...msgArray);

      // Ghi nội dung mới vào file JSON
      fileContent = JSON.stringify(existingData, null, 2);
    } else if (fileExtension === '.txt') {
      // Đọc nội dung hiện tại của file TXT
      try {
        const existingContent = fs.readFileSync(filePath, 'utf8');
        fileContent = existingContent + '\n' + msgArray.join('\n');
      } catch (error) {
        // Xử lý lỗi đọc file (có thể là file không tồn tại)
        fileContent = msgArray.join('\n');
      }
    } else {
      return send('⚠️ Loại file không được hỗ trợ. Chỉ hỗ trợ JSON và TXT.');
    }

    fs.writeFileSync(filePath, fileContent);

    return send(`Link đã được lưu vào file ${filePath}: ${msgArray.join(', ')}`);
  }
};
