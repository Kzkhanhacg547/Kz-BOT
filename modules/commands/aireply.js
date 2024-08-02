const axios = require('axios');

const api = 'https://sumiproject.io.vn/gpt4';

class Module {
    constructor(config) {
        this.config = config;
    }

    run() {}

    async handleEvent(o) {
        const msg = o.event.body;

        if (!msg) return;

        const validPrompts = ['AI', 'GPT', 'GPTGO'];

        if (validPrompts.includes(msg)) {
            try {
                const response = await axios.get(`${api}?q=${encodeURI(msg)}`);
                const answer = response.data.data.gpt4;

                o.api.sendMessage(answer, o.event.threadID, (err, data) => {
                    data.name = this.config.name;
                    data.status = true;
                    global.client.handleReply.push(data);
                }, o.event.messageID);
            } catch (err) {
                console.error(err);
            }
        }
    }

    async handleReply(o) {
        const msg = o.event.body;

        if (!msg) return;

        try {
            const response = await axios.get(`${api}?q=${encodeURI(msg)}`);
            const answer = response.data.data.gpt4;

            o.api.sendMessage(answer, o.event.threadID, (err, data) => {
                data.name = this.config.name;
                data.status = true;
                data.ask = msg;
                global.client.handleReply.push(data);
            }, o.event.messageID);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new Module({
    name: 'aireply',
    version: '1.1',
    hasPermssion: 0,
    credits: 'Kz Khánhh',
    description: 'GPT 4',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 0,
});
