module.exports.config = {
    name: 'autosendmsg',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ Thống',
    usages: '[]',
    cooldowns: 3
};
const nam = [{
    timer: '4:50:00 PM',
    message: ['hi=)))))))']
}],
idT = global.data.allThreadID,
idA = global.config.ADMINBOT,
{
    image
} = require('image-downloader'),
{
    createReadStream
} = require('fs-extra'),
request = require('request');
module.exports.onLoad = o => setInterval(() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) idT.forEach(i => o.api.sendMessage(r(á.message), i, (err, data) => global.client.handleReply.push({
        name: 'autosendmessage', messageID: data.messageID, idT: idA
    })));
}, 1000);
module.exports.run = o => {};
module.exports.handleReply = async function( {
    handleReply: $,
    api,
    event
}) {
    const txt = `Phản hồi từ ${!idA.includes(event.senderID)?'user': 'admin'} ${global.data.userName.get(event.senderID)}\n\n ${event.body}`;
    const msg = event.attachments.length != 0 ? {
        body: txt, attachment: await downStream(event.attachments[0].url)}: txt;
    $.idT.forEach(i => api.sendMessage(msg, i, (err, data) => global.client.handleReply.push({
        name: 'autosendmessage', messageID: data.messageID, idT: [event.threadID], idMsg: event.messageID
    }), $.idMsg));
};
async function downStream(url) {
    const dest = __dirname + `/cache/autosend_${request.get(url).uri.pathname}`;
    await image({
        url,
        dest
    });
    return createReadStream(dest);
};
