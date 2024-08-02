const axios = require("axios");
const fs = require('fs');
const path = require('path');
const { createReadStream } = require('fs');

module.exports.config = {
    name: "ggsearch",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "",
    description: "Tìm kiếm kết quả trên Google",
    commandCategory: "Công cụ",
    usages: "ggsearch [từ khóa]",
    cooldowns: 5,
    dependencies: {
        "google-it": ""
    }
};

async function googleSearch(keyword) {
    try {
        const results = await require('google-it')({ query: keyword });
        return results;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm trên Google:", error);
        throw error;
    }
}

async function getImagesFromUnsplash(keyword) {
    try {
        const accessKey = 'fdnzwzWL3ONFoToLMNj4D3DOouLgk_f45ylIHYyYfeA';
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&client_id=${accessKey}`;
        const response = await axios.get(url);
        const { results } = response.data;
        if (!results || results.length === 0) {
            throw new Error("Không tìm thấy ảnh cho từ khóa này trên Unsplash");
        }
        // Lấy ra các URL của hình ảnh từ kết quả
        const imageUrls = results.map(result => result.urls.regular);
        return imageUrls;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ảnh từ Unsplash:", error);
        throw error;
    }
}

module.exports.run = async function ({ api, event, args }) {
    try {
        const keyword = args.join(" ");
        if (!keyword) {
            return api.sendMessage('Vui lòng nhập từ khóa tìm kiếm', event.threadID, event.messageID);
        }

        const [searchResults, imageUrls] = await Promise.all([
            googleSearch(keyword),
            getImagesFromUnsplash(keyword)
        ]);

        let searchMessage = `[🌟] Kết quả tìm kiếm trên Google cho từ khóa "${keyword}":\n\n`;

        for (let i = 0; i < 5; i++) {
            const result = searchResults[i];
            searchMessage += `${i + 1}. ${result.title}\n${result.link}\n\n`;
        }

        const imageMessage = `[🌟] Kết quả tìm kiếm ảnh cho từ khóa "${keyword}":\n\n${imageUrls.join("\n")}`;

        api.sendMessage(searchMessage, event.threadID);

       // api.sendMessage(imageMessage, event.threadID);

        const cacheDir = path.join(__dirname, 'cache');

        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        const cachedImages = [];

        for (const [index, imageUrl] of imageUrls.entries()) {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imagePath = path.join(cacheDir, `${index}.jpg`);
            fs.writeFileSync(imagePath, response.data);
            cachedImages.push(createReadStream(imagePath));
        }

        const message = await api.sendMessage({
            body: imageMessage,
            attachment: cachedImages
        }, event.threadID);

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
