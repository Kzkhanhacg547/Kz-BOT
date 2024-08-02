const axios = require('axios');

module.exports.config = {
    name: "neko",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Random ảnh",
    commandCategory: "Hình ảnh",
    usages: "",
    cooldowns: 2
};

module.exports.run = async ({ api, event }) => {
    const getImage = async () => {
        const res = await axios.get('https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/images/neko');
        return (await axios.get(res.data.data, { responseType: 'stream' })).data;
    };

    const array = await Promise.all(Array.from({ length: 2 }, getImage));

    api.sendMessage({ body: '', attachment: array }, event.threadID, event.messageID);
};
