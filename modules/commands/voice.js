const { writeFileSync, createReadStream, unlinkSync } = require("fs-extra");
const { resolve } = require("path");
const axios = require("axios");

module.exports.config = {
    name: "voice",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "thanh_hiền",
    description: "Chuyển văn bản thành giọng nói",
    commandCategory: "Tiện ích",
    usages: "<tag: -f> [text]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": ""
    },
    envConfig: {
        'fpt_apikey': 'G5OUYSzOAPxIKnJ9f2lVxKxei5eSRHm1'
    }
};

module.exports.run = async function ({ event, api, args }) {
    const { threadID, messageID, messageReply } = event;
    const out = (msg, callback = function () {}) => api.sendMessage(msg, threadID, callback, messageID);    
    const { fpt_apikey } = global.configModule.voice;
    const fpt_speaker = {
        "-1":"banmai",
        "-2":"lannhi",
        "-3":"leminh",
        "-4":"myan",
        "-5":"thuminh",
        "-6":"giahuy"
    };
    const path = resolve(__dirname, 'cache', 'voice.mp3');

    try {
        if (args[0] === '-f') {
            const speak_id = Object.keys(fpt_speaker).includes(args[1]) ? fpt_speaker[args[1]] : 'banmai';
            const speak_data = event.type === "message_reply" ? messageReply.body : args.slice((Object.keys(fpt_speaker).includes(args[1]) ? 2 : 1)).join(" ");

            if (!speak_data) return out("🌺Bạn cần nhập văn bản để chuyển thành giọng nói🌺");

            const response = await axios({
                url: 'https://api.fpt.ai/hmi/tts/v5',
                method: 'POST',
                headers: {
                    'api-key': fpt_apikey,
                    'speed': '',
                    'voice': speak_id
                },
                data: speak_data
            });

            const req_url = response.data.async;

            if (!req_url) return out("🌺Có lỗi xảy ra hoặc vượt quá giới hạn chữ, vui lòng thử lại hoặc nhập chữ ngắn hơn🌺");

            const audioResponse = await axios.get(req_url, { responseType: 'arraybuffer' });

            writeFileSync(path, Buffer.from(audioResponse.data, 'utf-8'));
            return out({ attachment: createReadStream(path) }, () => unlinkSync(path));
        } else {
            const msg = '🌺Lựa chọn của bạn không hợp lệ, hãy thử tag: -f và nhập văn bản.🌺';
            return out(msg);
        }
    } catch (e) {
        console.log(e);
        return out('🌺Có lỗi xảy ra hoặc vượt quá giới hạn chữ, vui lòng thử lại hoặc nhập chữ ngắn hơn🌺');
    }
};
