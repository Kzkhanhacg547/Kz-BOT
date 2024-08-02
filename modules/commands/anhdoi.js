module.exports.config = {
    name: "anhdoi",
    version: "0.0.1",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Ảnh cho các cặp đôi",
    commandCategory: "Tiện ích",
    usages: "anhdoi",
    cooldowns: 1
};

module.exports.run = async function ({ event, api }) {
    const { messageID, threadID } = event;
    const axios = require('axios');
    const fs = require('fs');

    try {
        const response = await axios.get('https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/images/anhdoi');
        const data = response.data;

        // Assuming the API response is similar to the provided example
        const links = data;

        const url = [];
        for (const key in links) {
            if (links.hasOwnProperty(key) && key.startsWith('link')) {
                const path = __dirname + `/cache/couple/${key}.jpg`;
                const imageData = await axios.get(links[key], { responseType: 'arraybuffer' });
                fs.writeFileSync(path, Buffer.from(imageData.data));
                url.push(fs.createReadStream(path));
            }
        }

        // Wait for the attachment to be sent before deleting the files
        await api.sendMessage({
            attachment: url,
            body: `=== ảnh couple của bạn đây ===\nSố lượng ảnh: ${data.count}\nTác giả: ${data.author}`
        }, threadID, messageID);

        // Delete the files after the message is sent
        for (const key in links) {
            if (links.hasOwnProperty(key) && key.startsWith('link')) {
                const path = __dirname + `/cache/couple/${key}.jpg`;
                fs.unlinkSync(path);
            }
        }
    } catch (err) {
        console.error(err);
        return api.sendMessage('Có lỗi xảy ra khi xử lý dữ liệu từ API.', threadID, messageID);
    }
};
