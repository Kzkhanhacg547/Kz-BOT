const fs = require('fs');

module.exports.config = {
    name: "autoreset",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Thời gian",
    commandCategory: "Hệ thống",
    cooldowns: 5
};

module.exports.handleEvent = async function({ api, event, args, Users, Threads }) {
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
    var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[31m', '\x1b[1m'];
    var more = color[Math.floor(Math.random() * color.length)];
    var idad = global.config.ADMINBOT;
    var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");

    const logMessage = `🕓 TIME 🕓: ${timeNow} ➣ ${thu}`;

    // In ra console
    console.log(logMessage);

    // Ghi vào file log
    fs.appendFile('log.txt', logMessage + '\n', function (err) {
        if (err) throw err;
    });

    // Kiểm tra thời gian để reset hệ thống
    if (seconds < 5 && (parseInt(moment().format('mm')) % 120 === 0)) {
        for (let ad of idad) {
            setTimeout(() => {
                const resetMessage = `[ 𝐊𝐳 𝐁𝐎𝐓 ] - 𝗔𝗿𝗮 𝗔𝗿𝗮 😖, b𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀ 🕓: ${timeNow}\n𝗩𝗼̛̣ 𝘀𝗲̃ 𝘁𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝗿𝗲𝘀𝗲𝘁 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝗹𝗮̣𝗶 𝗻𝗵𝗲𝗮𝗮 𝗰𝗵𝗼̂̀𝗻𝗴 𝘆𝗲̂𝘂 𝗰𝗵𝗼̛̀ 𝘁𝗶́ 𝗻𝗵𝗲́ ☢️`;
                console.log(resetMessage);
                fs.appendFile('log.txt', resetMessage + '\n', function (err) {
                    if (err) throw err;
                });
                process.exit(1);
            }, 1000);
        }
    }
}

module.exports.run = async({ api, event, args }) => {
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const logMessage = `${timeNow}`;

    // In ra console
    console.log(logMessage);

    // Ghi vào file log
    fs.appendFile('log.txt', logMessage + '\n', function (err) {
        if (err) throw err;
    });
}
