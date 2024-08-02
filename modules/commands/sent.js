const fs = require('fs');
const path = require('path');
const ADMIN_ID = '100081129610697';

module.exports.config = {
  name: "sent",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Kz Khánhh",
  description: "Lệnh này chỉ Admin dùng thôi",
  commandCategory: "Hệ thống",
  cooldowns: 3
};

async function sendImages(api) {
  try {
    const directory = './checkcam';
    const files = await fs.promises.readdir(directory);

    if (files.length === 0) {
      console.log('Thư mục checkcam trống.');
      return;
    }

    const attachments = files.map(file => {
      const filePath = path.join(directory, file);
      return fs.createReadStream(filePath);
    });

    api.sendMessage({ body: "", attachment: attachments }, ADMIN_ID, async (err) => {
      if (err) {
        console.error('Có lỗi xảy ra khi gửi tin nhắn:', err);
        return;
      }

      try {
        await Promise.all(files.map(async file => {
          const filePath = path.join(directory, file);
          await fs.promises.unlink(filePath);
          console.log(`Đã gửi và xóa file: ${filePath}`);
        }));

        console.log('Đã gửi và xóa tất cả các file trong thư mục checkcam.');
      } catch (deleteErr) {
        console.error('Có lỗi xảy ra khi xóa file:', deleteErr);
      }
    });
  } catch (err) {
    console.error('Có lỗi xảy ra khi xử lý thư mục:', err);
  }
}

async function cleanDirectory(api, threadID) {
  try {
    const directory = './checkcam';
    const files = await fs.promises.readdir(directory);

    if (files.length === 0) {
      api.sendMessage("Thư mục checkcam đã trống.", threadID);
      return;
    }

    await Promise.all(files.map(async file => {
      const filePath = path.join(directory, file);
      await fs.promises.unlink(filePath);
      console.log(`Đã xóa file: ${filePath}`);
    }));

    api.sendMessage("Đã xóa tất cả các file trong thư mục checkcam.", threadID);
  } catch (err) {
    console.error('Có lỗi xảy ra khi xóa file:', err);
  }
}

module.exports.run = async ({ api, event, args }) => {
  const action = args[0];
  switch (action) {
    case "sent":
      await sendImages(api);
      break;
    case "clean":
      await cleanDirectory(api, event.threadID);
      break;
    default:
      api.sendMessage("Hành động không hợp lệ. Vui lòng sử dụng 'sent' hoặc 'clean'.", event.threadID);
  }
};
