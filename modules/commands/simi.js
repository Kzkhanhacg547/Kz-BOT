let r = require('axios').get;
const API = global.config.API.domain1; // Điều chỉnh URL API theo định dạng của API cung cấp.

class Module {
    constructor(a) {
        this.config = a;
    };
    run() {};
    handleEvent(o) {
        let msg = o.event.body;
        const reply = [
            '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Em đây\n——————————————————\n👉𝐑ềply tin nhắn của bạn ở đây',
          '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Đã nghe rõ thưa chủ nhân\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
          '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Bắt đầu nhận lệnh từ chủ nhân\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
          '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Simi đã nghe rõ\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
          '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Mời chủ nhân ra mệnh lệnh\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭',
          '🌸🌸🌸『 𝐁𝐎𝐓 𝐒𝐈𝐌 』🌸🌸🌸\n🤖𝐁𝐨𝐭: Bắt đầu nghe thánh chỉ từ ngài\n——————————————————\n👉𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐝𝐞̂̉ 𝐭𝐫𝐨̀ 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭'
        ];

        if (!!msg) msg = msg.toLowerCase();
        else return;
        if ([
            'hey sim',
            'Hey sim',
            'Sim ơi',
            'sim ơi',
            'Sim',
            'sim',
            'Simi ơi',
            'simi ơi',
            'simi',
            'Simi',
            'bot',
            'Bot',
        ].includes(msg)) {
            // Sửa lại đoạn này để gọi API và lấy dữ liệu answer
            r(`${API}?type=ask&ask=${encodeURI(msg)}&apikey=kzkhanhz5631706775`)
                .then(response => {
                    const answer = response.data.answer;
                    o.api.sendMessage(answer, o.event.threadID, (err, data) => {
                        data.name = this.config.name;
                        data.status = true;
                        global.client.handleReply.push(data);
                    }, o.event.messageID);
                })
                .catch(err => {
                    console.error(err);
                });
        } else if (msg.startsWith("kzteach")) {
            const teachMessage = msg.slice(10).trim();
            const [question, answer] = teachMessage.split(" -> ");
            if (question && answer) {
                r(`${API}?type=teach&ask=${encodeURI(question)}&ans=${encodeURI(answer)}&apikey=kzkhanhz5631706775`)
                    .then(response => {
                        o.api.sendMessage("Em đã học được! Cảm ơn bạn đã giúp em cải thiện.", o.event.threadID);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                o.api.sendMessage("Câu lệnh dạy không đúng định dạng. Vui lòng thử lại.", o.event.threadID);
            }
        }
    }

    handleReply = async (o) => {
        let _ = o.handleReply;
        let $ = o.api.sendMessage;
        let msg = o.event.body;

        if (!!msg) msg = encodeURI(msg);
        else return;

        // Sửa lại đoạn này để gọi API và lấy dữ liệu answer
        const response = await r(`${api}?type=ask&ask=${msg}`);
        const answer = response.data.answer;

        $(answer, o.event.threadID, (err, data) => {
            data.name = this.config.name;
            data.status = true;
            data.ask = msg;
            global.client.handleReply.push(data);
        }, o.event.messageID);
    };
}

module.exports = new Module({
    name: 'simi',
    version: '1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Gửi tin nhắn đến bot và nhận câu trả lời.',
    commandCategory: 'Tiện ích',
    usages: '[.]',
    cooldowns: 0,
});
