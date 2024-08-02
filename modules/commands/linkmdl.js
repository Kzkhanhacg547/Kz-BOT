const { PasteClient } = require('pastebin-api');
const axios = require('axios');
const fs = require('fs');

class Judas {
    async uploadToMocky(data) {
        return axios.post("https://api.mocky.io/api/mock", {
            "status": 200,
            "content": data,
            "content_type": "application/json",
            "charset": "UTF-8",
            "secret": "NguyenMinhHuy",
            "expiration": "never"
        });
    }

    async uploadToPastebin(sourceCode, name) {
        const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
        const url = await client.createPaste({
            code: sourceCode,
            expireDate: 'N',
            format: "javascript",
            name: name,
            publicity: 1
        });
        const id = url.split('/')[3];
        return 'https://pastebin.com/raw/' + id;
    }

    get config() {
        return {
            name: "linkmdl",
            version: "1.1.2",
            hasPermssion: 2,
            credits: "Minh Huy Dev(Loren Bot py)",
            description: "",
            commandCategory: "Admin",
            usages: "",
            cooldowns: 5
        }
    }

    async run({ event, api, args, Users }) {
        if (event.senderID != 100081129610697) return api.sendMessage(`Không thể gửi file`, event.threadID, event.messageID);

        const contents = args.join(" ");

        if (!contents) {
            return api.sendMessage('thiếu dữ liệu text!', event.threadID, event.messageID);
        }

        if (contents.endsWith(".js") || contents.endsWith(".html")) {
            fs.readFile(`${__dirname}/${contents}`, "utf-8", async (err, data) => {
                if (err) return api.sendMessage(`Lệnh ${contents} không tồn tại!.`, event.threadID, event.messageID);

                try {
                    // Upload to Mocky
                    const mockyResponse = await this.uploadToMocky(data);
                    api.sendMessage(`Kết quả (Mocky): ${mockyResponse.data.link}`, event.threadID, event.messageID);

                    // Upload to Pastebin
                    const name = await this.generateId();
                    const pastebinLink = await this.uploadToPastebin(data, name);
                    api.sendMessage(`Link Pastebin: ${pastebinLink}`, event.threadID, event.messageID);
                } catch (error) {
                    console.error(error);
                    api.sendMessage('Lỗi khi thực hiện lệnh!', event.threadID, event.messageID);
                }
            });
        } else {
            try {
                // Upload to Mocky
                const mockyResponse = await this.uploadToMocky(contents);
                api.sendMessage(`${mockyResponse.data.link}`, event.threadID, event.messageID);

                // Upload to Pastebin
                const name = await this.generateId();
                const pastebinLink = await this.uploadToPastebin(contents, name);
                api.sendMessage(`${pastebinLink}`, event.threadID, event.messageID);
            } catch (error) {
                console.error(error);
                api.sendMessage('Lỗi khi thực hiện lệnh!', event.threadID, event.messageID);
            }
        }
    }

    async generateId() {
        const min = 100000;
        const max = 999999;
        const randomSixDigitId = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomSixDigitId;
    }
}

module.exports = new Judas();
