const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const API = global.config.API.domain1;

module.exports.config = {
    name: "simvoice",
    version: "4.3.6",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: "Chat cùng con sim mất dậy nhất",
    commandCategory: "Chat cùng sim",
    usages: "[args]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    }
}

async function teachSim(question, answer) {
    const apiUrl = `${API}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`;

    const response = await axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    });

    return response.data;
}

async function simVoice(text) {
    const apiUrl = `${API}/sim?type=ask&ask=${encodeURIComponent(text)}`;

    const response = await axios.get(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    });

    return response.data.answer;
}

async function downloadFile(url, outputPath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                resolve();
            }
        });
    });
}

module.exports.handleEvent = async function ({ api, event }) {
    const { createReadStream, unlinkSync } = fs;
    const { resolve } = path;
    const { threadID, messageID, senderID, body } = event;

    if (senderID === api.getCurrentUserID() || !body) return;

    try {
        const text = await simVoice(body);
        const filePath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
        await downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`, filePath);
        api.sendMessage({ attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath));
    } catch (e) {
        console.log(e);
    }
}

module.exports.run = async function ({ api, event, args }) {
    const { createReadStream, unlinkSync } = fs;
    const { resolve } = path;
    const { threadID, messageID } = event;

    if (!args[0]) return api.sendMessage("Bạn chưa nhập tin nhắn", threadID, messageID);

    switch (args[0]) {
        case "on":
            global.procodermew = global.procodermew || {};
            global.procodermew.simsimi = global.procodermew.simsimi || new Map();
            global.procodermew.simsimi.set(threadID, messageID);
            api.sendMessage("Đã bật sim thành công.", threadID, messageID);
            break;
        case "off":
            if (global.procodermew && global.procodermew.simsimi && global.procodermew.simsimi.has(threadID)) {
                global.procodermew.simsimi.delete(threadID);
                api.sendMessage("Đã tắt sim thành công.", threadID, messageID);
            } else {
                api.sendMessage("Bạn chưa bật sim.", threadID, messageID);
            }
            break;
        case "teach":
            if (args.length < 4 || args[2] !== '=>') return api.sendMessage("Bạn phải nhập đủ câu hỏi và câu trả lời để dạy sim. Sử dụng định dạng: !simvoice teach <câu hỏi> => <câu trả lời>", threadID, messageID);

            const question = args[1];
            const answer = args.slice(3).join(" ");

            try {
                const teachResponse = await teachSim(question, answer);
                api.sendMessage(teachResponse, threadID, messageID);
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            try {
                const text = await simVoice(args.join(" "));
                const filePath = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
                await downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`, filePath);
                api.sendMessage({ attachment: createReadStream(filePath) }, event.threadID, () => unlinkSync(filePath));
            } catch (e) {
                console.log(e);
            }
            break;
    }
}
