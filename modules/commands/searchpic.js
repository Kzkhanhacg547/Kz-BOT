const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
 name: "searchpic",
 version: "2.0.0",
 hasPermssion: 0,
 credits: "",
 description: "Tìm kiếm ảnh trên Google",
 commandCategory: "Công cụ",
 usages: "searchpic [từ khóa] - [số lượng]",
 cooldowns: 0
};

async function getUrlDownloadImage(keyword) {
 try {
   const url = `https://api.phungtuanhai.online/crawl/ggimg?apikey=PTH&s=${encodeURIComponent(keyword)}`;
   const response = await axios.get(url);
   const { status, message, data } = response.data;

   if (status !== 200) {
     throw new Error(`Lỗi từ API: ${message}`);
   }

   if (!data || !data.url_image || data.url_image.length === 0) {
     throw new Error("Không tìm thấy ảnh trong dữ liệu API");
   }

   return data.url_image;
 } catch (error) {
   console.error("Lỗi khi lấy dữ liệu ảnh từ API:", error);
   throw error;
 }
}

module.exports.run = async function ({ api, event, args }) {
 try {
   const keyword = args.slice(1, args.length - 1).join(" ");
   const limit = !isNaN(args[args.length - 1]) ? parseInt(args[args.length - 1]) : null;

   if (!keyword) {
     return api.sendMessage('Vui lòng nhập từ khóa tìm kiếm', event.threadID, event.messageID);
   }

   const imageUrlArray = await getUrlDownloadImage(keyword);

   if (imageUrlArray.length === 0) {
     return api.sendMessage(`Không tìm thấy ảnh nào với từ khóa: ${keyword}`, event.threadID, event.messageID);
   }

   const limitedResults = limit ? imageUrlArray.slice(0, limit) : imageUrlArray;

   if (limitedResults.length === 0) {
     return api.sendMessage(`Không tìm thấy ảnh nào với từ khóa: ${keyword}`, event.threadID, event.messageID);
   }

   const cacheDir = path.join(__dirname, 'cache');
   if (!fs.existsSync(cacheDir)) {
     fs.mkdirSync(cacheDir, { recursive: true });
   }

   const cachedImages = [];
   for (const [index, imageUrl] of limitedResults.entries()) {
     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
     const imagePath = path.join(cacheDir, `${index}.jpg`);
     fs.writeFileSync(imagePath, response.data);
     cachedImages.push(fs.createReadStream(imagePath));
   }

   const message = await api.sendMessage({
     body: `🌸=== [ 𝐆𝐎𝐎𝐆𝐋𝐄 ] ===🌸\n━━━━━━━━━━━━━\n\n${limitedResults.length} kết quả tìm kiếm ảnh với từ khóa: ${keyword} 🌸\n` + (limit && limit < imageUrlArray.length ? `Đã xảy ra lỗi khi tải ${imageUrlArray.length - limit} ảnh` : ""),
     attachment: cachedImages
   }, event.threadID);

   // Xóa các tệp ảnh đã cache sau khi gửi tin nhắn
   cachedImages.forEach((cachedImage, index) => {
     const imagePath = path.join(cacheDir, `${index}.jpg`);
     fs.unlinkSync(imagePath);
   });

   return message;
 } catch (error) {
   console.error("Đã có lỗi xảy ra:", error);
   return api.sendMessage("Đã có lỗi xảy ra", event.threadID, event.messageID);
 }
};