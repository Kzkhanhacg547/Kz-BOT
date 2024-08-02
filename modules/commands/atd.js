let axios = require('axios');
let fs = require('fs');

let is_url = url => /^https?:\/\//.test(url);
let stream_url = (url, type) => axios.get(url, {
  responseType: 'arraybuffer'
}).then(res => {
  let path = __dirname + '/cache/' + Date.now() + '.' + type;
  fs.writeFileSync(path, res.data);
  setTimeout(p => fs.unlinkSync(p), 1000 * 60, path);
  return fs.createReadStream(path);
});

let data = {};
let path = __dirname + '/cache/status_auto_down.json';
let save = () => fs.writeFileSync(path, JSON.stringify(data));

if (!fs.existsSync(path)) save(); else data = require(path);

exports.config = {
  name: 'atd',
  version: '0.0.2',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Auto download media from various platforms',
  commandCategory: 'System',
  usages: '[]',
  cooldowns: 3
};

exports.run = function(o) {
  let send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
  send(`[====[ AUTO DOWNLOAD ]====]\n\nAuto download is currently ${data[o.event.threadID] ? 'ON' : 'OFF'}.\nReply with "on" to enable or "off" to disable.`, (err, res) => {
    res.name = exports.config.name,
    res.event = o.event;
    global.client.handleReply.push(res);
  });
};

exports.handleEvent = async function(o) {
  try {
    let status = data[o.event.threadID];
    let a = o.event.args[0];
    let send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);

    if (!status || !is_url(a)) return;

    let res = await axios.get(`https://apitntxtrick.onlitegix.com/downall?link=${encodeURIComponent(a)}`);
    let content = res.data;

    if (content.error) {
      send(`Error: ${content.error}`);
      return;
    }

    let attachment = [];
    if (content.medias && content.medias.length > 0) {
      for (let media of content.medias) {
        if (media.url) {
          try {
            attachment.push(await stream_url(media.url, media.extension || 'mp4'));
          } catch (e) {
            console.log(`Error downloading media: ${e}`);
          }
        }
      }
    }

    let body = `[====[ ${content.source.toUpperCase()} AUTO DOWN ]====]\n\n`;
    body += `- Tiêu Đề: ${content.title || 'N/A'}\n`;
    body += `- Tác Giả: ${content.author || 'N/A'}\n`;
    if (content.duration) body += `- Thời Lượng: ${content.duration} giây\n`;

    send({
      body: body,
      attachment: attachment,
    });

  } catch (e) {
    console.log(e);
    o.api.sendMessage(`An error occurred: ${e.message}`, o.event.threadID);
  }
};

exports.handleReply = function(o) {
  let _ = o.handleReply;
  let t = o.event.threadID;
  let send = (msg, callback) => o.api.sendMessage(msg, t, callback, o.event.messageID);

  if (o.event.senderID != _.event.senderID) return;

  let status_input = o.event.body.toLowerCase();

  if (status_input === 'on') {
    data[t] = true;
    send(`Auto download has been enabled for this thread.`);
  } else if (status_input === 'off') {
    data[t] = false;
    send(`Auto download has been disabled for this thread.`);
  } else {
    send(`Invalid input. Please reply with "on" to enable or "off" to disable.`);
    return;
  }

  save();
};