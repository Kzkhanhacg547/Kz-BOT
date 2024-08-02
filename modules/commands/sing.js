const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Tiện ích",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const moment = require("moment-timezone"); 
  const namebot = global.config.BOTNAME;
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('[💌]→ Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `==== 『 𝐒𝐈𝐍𝐆 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  』 ====\n\n[🎵]→ Title: ${data.title}\n[⏱️]→ Thời lượng video: ${this.convertHMS(data.dur)}\n[💌]→ Tên kênh: ${data.author}\n[📈]→ Số view: ${data.viewCount}\n[🔰]→ Số like: ${data.likes}\n[⏱️]→ Thời gian xử lý: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n━━━━━━━━━━━━━━━\n[💌]=== 『 ${namebot} 』 ===[💌]\n\n===「${timeNow}」===`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)

    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
    if (args.length == 0 || !args) return api.sendMessage({body: '==== [ 𝗦𝗜𝗡𝗚 𝗠𝗘𝗡𝗨 ] ====\n━━━━━━━━━━━━━━━━━━\n𝟭. 𝘀𝗶𝗻𝗴 + 𝘁𝗲̂𝗻 𝗯𝗮̀𝗶 𝗵𝗮́𝘁 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗻𝗴𝗵𝗲 (𝘃𝗱: 𝘀𝗶𝗻𝗴 𝗰𝗵𝗮́𝘂 𝘆𝗲̂𝘂 𝗯𝗮̀)\n𝟮. 𝘀𝗶𝗻𝗴 + 𝗹𝗶𝗻𝗸 𝘃𝗱 𝘆𝘁𝗯 𝗻𝗵𝗮̣𝗰 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗻𝗴𝗵𝗲 (𝘃𝗱: 𝘀𝗶𝗻𝗴 𝗵𝘁𝘁𝗽𝘀://𝘆𝗼𝘂𝘁𝘂.𝗯𝗲/𝗶𝗗𝗫𝗥𝗞𝗛𝗬𝟳𝗺𝗝𝗔)\n[💓] → 𝗕𝗮̣𝗻 𝗰𝘂̃𝗻𝗴 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝗮̀𝗶 𝘀𝗶𝗻𝗴 𝗵𝗼𝗮̣̆𝗰 𝘀𝗶𝗻𝗴𝟏𝐡\n━━━━━━━━━━━━━━━━━━\n⚠️ 𝗟𝘂̛𝘂 𝘆́ 𝟭 𝘀𝗼̂́ 𝗻𝗵𝗮̣𝗰 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝗴𝘂̛̉𝗶 đ𝘂̛𝗼̛̣𝗰 𝗹𝗮̀ 𝗱𝗼 𝗾𝘂𝗮́ 𝗱𝗮̀𝗶', attachment: (await axios.get((await axios.get(`https://f34db9b6-0c67-4bcc-8e84-437864b93b11-00-3kfgqap8lsd4a.pike.replit.dev/images/videochill`)).data.url, {
                    responseType: 'stream'
                })).data},
  event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    const moment = require("moment-timezone"); 
    const namebot = global.config.BOTNAME;
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('[💌]→ Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `==== 『 𝐒𝐈𝐍𝐆 𝐘𝐎𝐔𝐓𝐔𝐁𝐄  』 ====\n\n[🎵]→ Title: ${data.title}\n[⏱️]→ Thời lượng video: ${this.convertHMS(data.dur)}\n[💌]→ Tên kênh: ${data.author}\n[📈]→ Số view: ${data.viewCount}\n[🔰]→ Số like: ${data.likes}\n[⏱️]→ Thời gian xử lý: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n━━━━━━━━━━━━━━━\n[💌]=== 『 ${namebot}  』 ===[💌]\n\n===「${timeNow}」===`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)

        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,10)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num}. [🎬]→ Title ${value.title}\n[⏰]→ Thời lượng: ${value.length.simpleText}\n\n`);
            }
            var body = `[🔎]→ Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n━━━━━━━━━━━━━━━\n\n${msg}\n━━━━━━━━━━━━━━━\n\n[💌]→ Hãy reply (phản hồi) chọn một trong những tìm kiếm trên\n\n===「${timeNow}」===`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('[💌]→ Đã xảy ra lỗi, vui lòng thử lại trong giây lát!!\n' + e, event.threadID, event.messageID);
        }
    }
}