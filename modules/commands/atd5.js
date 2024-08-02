const axios = require('axios');
const fs = require('fs');
const { join } = require('path');

function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const matches = text.match(urlRegex);
  return matches || []; 
}

module.exports.config = {
  name: 'atd',
  version: '1',
  hasPermssion: 0,
  credits: 'Nguyên Blue',
  description: '',
  usePrefix: false,
  commandCategory: 'TIỆN ÍCH',
  usages: [],
  cooldowns: 3
};
module.exports.handleEvent = async function(o) {
  try {
    const token = "EAAD6V7os0gcBO5XblOZCxoZCDIuepQEiOTgtXrkZCAAcUv4W2ZBkXxGHQZBI1sLXdvodCQ7Bl5rfAzjUUy9gWGonvRVEfYRmVmNZCeyZAujCl5Kd07BS6jlgFq8KednmQqcC0SvUcJVcB0zd0sxIPWnjvxZB9E9Q0LIclnsPgDsOSaoSSMjWbSWpZCvD1qwZDZD";
    const urls = urlify(o.event.body);
    for (const url of urls) {
      if (/tiktok/.test(url)) {
        setTimeout(() => {}, 10000);
        const res = await axios.get(`https://apidown.site/api/tiktok/v1?link=${url}`);
        let attachment = [];
        if (res.data && res.data.data) {
          const data = res.data.data;
          if (data.play && !data.images) {
            const path = join(process.cwd(), `/cmds/cache/${Date.now()}.mp4`);
            const response = await axios.get(data.play, { responseType: "arraybuffer" });
            const buffer = Buffer.from(response.data);
            fs.writeFileSync(path, buffer);
            attachment.push(fs.createReadStream(path));
          }
          if (data.images) {
            for (let i = 0; i < data.images.length; i++) {
              const path = join(process.cwd(), `/cmds/cache/${i + 1}.jpg`);
              const response = await axios.get(data.images[i], { responseType: "arraybuffer" });
              const buffer = Buffer.from(response.data);
              fs.writeFileSync(path, buffer);
              attachment.push(fs.createReadStream(path));
            }
          }
          await o.api.sendMessage({
            body: `[  TIKTOK - DOWNLOAD  ]\n⩺ Tiêu đề: ${data.title || "Không Có Tiêu Đề"}\n`,
            attachment,
          }, o.event.threadID, o.event.messageID);
        }
      }
      if (/douyin/.test(url)) {
        setTimeout(() => {}, 10000);
        const res = await axios.get(`https://apidown.site/api/douyin/v1?link=${url}`);
        let attachment = [];
        if (res.data) {
          const data = res.data;
          if (data.video && !data.image) {
            const path = join(process.cwd(), `/cmds/cache/${Date.now()}.mp4`);
            const response = await axios.get(data.video, { responseType: "arraybuffer" });
            const buffer = Buffer.from(response.data);
            fs.writeFileSync(path, buffer);
            attachment.push(fs.createReadStream(path));
          }
          if (data.image) {
            for (let i = 0; i < data.image.length; i++) {
              const path = join(process.cwd(), `/cmds/cache/${i + 1}.jpg`);
              const response = await axios.get(data.image[i], { responseType: "arraybuffer" });
              const buffer = Buffer.from(response.data);
              fs.writeFileSync(path, buffer);
              attachment.push(fs.createReadStream(path));
            }
          }
          await o.api.sendMessage({
            body: `[  DOUYIN - DOWNLOAD  ]\n`,
            attachment,
          }, o.event.threadID, o.event.messageID);
        }
      }
      if (/facebook/.test(url)) {
        const res = (await axios.get(`https://apidown.site/api/facebook/v2?link=${encodeURIComponent(url)}&token=${token}`)).data;
        if (res.attachments && res.attachments.length > 0) {
          let attachment = [];
          for (const attachmentItem of res.attachments) {
            if (attachmentItem.type === 'video') {
              const videoUrl = attachmentItem.url;
              attachment.push(await streamURL(videoUrl, 'mp4'));
            } else if (attachmentItem.type === 'photo') {
              attachment.push(await streamURL(attachmentItem.url, 'jpg'));
            }
          }
          await o.api.sendMessage({
            body: `[  FACEBOOK - DOWNLOAD  ]\n⩺ Tiêu đề: ${res.message}\n⩺ Lượt quan tâm: ${res.statistics.like}\n⩺ Lượt bình luận: ${res.statistics.comment}\n⩺ Lượt chia sẽ: ${res.statistics.share}`,
            attachment,
          }, o.event.threadID, o.event.messageID);
        }
      }
    }
  } catch (e) {
    console.log('Error', e);
  }
};

module.exports.run = () => {};

function streamURL(url, type) {
  return axios.get(url, {
    responseType: 'arraybuffer'
  }).then(res => {
    const path = __dirname + `/cache/${Date.now()}.${type}`;
    fs.writeFileSync(path, res.data);
    setTimeout(p => fs.unlinkSync(p), 1000 * 60, path);
    return fs.createReadStream(path);
  });
}