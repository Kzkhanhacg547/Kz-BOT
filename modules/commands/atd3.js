const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
const instance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
});
const isURL = u => /^http(|s):\/\//.test(u);

exports.handleEvent = async function(o) {
    try {
        const str = o.event.body;
        const send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);
        const head = app => `==『 AUTODOWN ${app.toUpperCase()} 』==\n────────────────`;

        if (isURL(str)) {
            /* ... (các điều kiện kiểm tra link) ... */
            if (/catbox\.moe/.test(str)) {
                send({ body: 'Link CATBOX à\nBot không down được:((' });
                return;
            }
            if (/(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//.test(str)) {
                const json = await infoPostTT(str);
                let attachment = [];
                if (json.images != undefined) {
                    for (const $ of json.images) {
                        attachment.push(await streamURL($, 'png'));
                    }
                } else {
                    attachment = await streamURL(json.play, 'mp4');
                }

                send({
                    body: `🖼===[ 𝗧𝗜𝗞𝗧𝗢𝗞 ]===🎼\n✏️ 𝗔𝘂𝘁𝗵𝗼𝗿: ${json.author.nickname}\n📝 𝗧𝗶𝗲̂𝘂 Đ𝗲̂̀ : ${json.title}`, attachment
                });
            } //else if (/(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO YOUTUBE */
              /*  const res = await axios.get(`https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/youtube/download?id=${str}`);
               send({
                    body: `\n[💬] → title: ${res.data.data.title}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘃𝗶𝗱𝗲𝗼: ${res.data.data.duration}`, attachment: await streamURL(res.data.data.video.url, 'mp4')
               });
          }   */
            else if (/ibb\.co/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IBB */
                send({body: `${head('IMGBB')}\n`,attachment: await streamURL(str, str.split('.').pop()) })
            } else if (/imgur\.com/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IMGUR */
                send({
                    body: ` =====imgur=====`,
                    attachment: await streamURL(str, str.split('.').pop())
                })
            } else if (/capcut\.com/.test(str)) {
                /* AUTODOWN CAPCUT VIDEO */
                try {
                    const getUrlResponse = await axios.get(`https://ssscap.net/api/download/get-url?url=${str}`);
                    const videoId = getUrlResponse.data.url.split("/")[4].split("?")[0];
                    const options = {
                        method: 'GET',
                        url: `https://ssscap.net/api/download/${videoId}`,
                        headers: {
                            'Connection': 'keep-alive',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                            'Cookie': 'sign=08321c1cc11dbdd2d6e3c63f44248dcf; device-time=1699454542608',
                            'Referer': 'https://ssscap.net/vi',
                            'Host': 'ssscap.net',
                            'Accept-Language': 'vi-VN,vi;q=0.9',
                            'Accept': 'application/json, text/plain, /',
                            'Sec-Fetch-Dest': 'empty',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'cors'
                        }
                    };
                    const response = await axios.request(options);
                    const { title, description, usage, originalVideoUrl } = response.data;
                    const videoDownloadUrl = `https://ssscap.net${originalVideoUrl}`;
                    const stream = (await axios.get(videoDownloadUrl, { responseType: 'stream' })).data;
                    send({
                        body: `📝 Tiêu đề: ${title}
🗒 Mô tả: ${description}
📸 Sử dụng: ${usage}
🌸 Tự động gửi video link Capcut`,
                        attachment: stream
                    });
                } catch (error) {
                    console.error(error);
                    send({ body: 'Không thể tải video từ link đã cung cấp' });
                }
            } else if (/soundcloud\.com/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC NHẠC SOUNDCLOUD */
                var res = (await axios.get(`https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/soundcloud/download?apikey=kzkhanhz7517222606&link=${str}`));
                const stream = (await axios.get(res.data.result.download, { responseType: "arraybuffer" })).data;
                const path = __dirname + `/cache/1.mp3`;
                fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
                o.api.sendMessage({
                    body: ``,
                    attachment: fs.createReadStream(path)
                }, o.event.threadID, () => fs.unlinkSync(path), o.event.messageID);
            } else if (/zingmp3\.vn/.test(str)) {
                /* TỰ ĐỘNG TẢI NHẠC ZINGMP3 */
                send({ body: `${head('ZINGMP3')}\n`, attachment: await streamURL(`https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/zingmp3/download?apikey=kzkhanhz7517222606&link=${str}`, 'mp3') });
            } else if (/(^https:\/\/)((www)\.)?(pinterest|pin)*\.(com|it)\//.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO PINTEREST */
                const res = await axios.get(`https://api.imgbb.com/1/upload?key=588779c93c7187148b4fa9b7e9815da9&image=${str}`);
                send({
                    body: `${head('PINTEREST')}\n- link: ${res.data.data.image.url}`, attachment: await streamURL(res.data.data.image.url, 'jpg')
                });
            } else if (/(^https:\/\/)((www)\.)?(twitter)\.(com)\//.test(str)) {
                /* TỰ ĐỘNG TẢI VIDEO TWITTER */
                const apiUrl = `https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/twitter/get?url=${str}`;
                const response = await axios.get(apiUrl);

                if (response.data) {
                    const twitterData = response.data;
                    send({
                        body: `${head('TWITTER')}\n- Description: ${twitterData.desc}`,
                        attachment: await streamURL(twitterData.HD, 'mp4')
                    });
                } else {
                    send({ body: "Error retrieving Twitter data" });
                }
            } else if (/(^https:\/\/)((www)\.)?(facebook)\.(com)\//.test(str)) {
                /* TỰ ĐỘNG TẢI VIDEO FACEBOOK */
                const apiUrl = `https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/fbdownload?url=${str}`;
                const response = await axios.get(apiUrl);

                if (response.data) {
                    const facebookData = response.data.data;
                    send({
                        body: `${head('FACEBOOK')}\n- Title: ${facebookData.title}\n- Source: ${facebookData.source}`,
                        attachment: await streamURL(facebookData.medias[0].url, 'mp4') // Change index if you want different quality
                    });
                } else {
                    send({ body: "Error retrieving Facebook video data" });
                }
            } else if (/instagram\.com/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO INSTAGRAM */
                const res = await axios.get(`https://2e457282-9d9e-46ab-90e5-73d76257939a-00-j316jxv80ome.pike.replit.dev/instagram/dlpost?url=${str}`);
                const { videos = [{}], images } = res.data;
                let attachment = [];

                if (videos[0] != undefined) {
                    attachment = await streamURL(videos[0], 'mp4');
                } else if (images != undefined) {
                    for (const $ of typeof images == 'string' ? [images] : images) {
                        attachment.push(await streamURL($, 'png'));
                    }
                }
                send({
                    body: `${head('INSTAGRAM')}\n Tiêu Đề: ${res.data.caption}`, attachment
                });
            }

            // Bổ sung phần xử lý cache và gửi file
            const attachment = await streamURL(str, str.split('.').pop());
            send({
                body: `===== Custom Downloader =====\nLink: ${str}`,
                attachment
            });
        }
    } catch (e) {
        console.log('Error', e);
    }
};

exports.run = () => {};
exports.config = {
    name: 'atd3',
    version: '1',
    hasPermssion: 0,
    credits: 'Kz Khánhh',
    description: '',
    commandCategory: 'Tiện ích',
    usages: [],
    cooldowns: 1
};

async function streamURL(url, type) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const path = __dirname + `/cache/${Date.now()}.${type}`;
        fs.writeFileSync(path, response.data);

        // Gửi file
        const fileReadStream = fs.createReadStream(path);

        // Xóa cache sau khi gửi
        fileReadStream.on('end', () => {
            setTimeout(() => {
                fs.unlinkSync(path);
            }, 1000 * 60); // Xóa sau 1 phút
        });

        return fileReadStream;
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}
