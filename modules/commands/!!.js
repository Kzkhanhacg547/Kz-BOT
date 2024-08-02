const axios = require('axios');
const fs = require('fs');
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
            /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO TIKTOK */
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
                    body: `🖼===[ 𝗧𝗜𝗞𝗧𝗢𝗞 ]===🎼\n✏️ 𝗔𝘂𝘁𝗵𝗼𝗿: ${json.author.nickname}\n📝 𝗧𝗶𝗲̂u Đ𝗲̂̀ : ${json.title}`, attachment
                });
            } else if (/(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO YOUTUBE */
                try {
                    const res = await axios.get(`https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/youtube/download?url=${str}`);

                    // Lấy đường link download cho chất lượng mp4
                    const mp4Links = res.data.audioLinks.find(link => link.type === 'mp4');

                    if (mp4Links) {
                        const mp4Quality = mp4Links.qualitys[0]; // Chọn chất lượng đầu tiên (có thể điều chỉnh nếu cần)

                        send({
                            body: `\n[💬] → 𝐓𝐢𝐭𝐥𝐞: ${res.data.title}\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘃𝗶𝗱𝗲𝗼: ${res.data.lengthSeconds} giây`,
                            attachment: await streamURL(mp4Quality.dlink, 'mp4')
                        });
                    } else {
                        send({
                            body: "Không tìm thấy đường link download cho chất lượng mp4."
                        });
                    }
                } catch (error) {
                    console.error("Lỗi khi tải dữ liệu từ API:", error);
                    send({
                        body: "Có lỗi xảy ra khi tải dữ liệu từ API."
                    });
                }
            }

            else if (/ibb\.co/.test(str)) {
               /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IBB */
               send({body: `${head('IMGBB')}\n`,attachment: await streamURL(str, str.split('.').pop()) })
            } else if (/imgur\.com/.test(str)) {
              /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO IMGUR */
                  send({
                      body: ` =====imgur=====`,
                      attachment: await streamURL(str, str.split('.').pop())
                  })
              } else if (/soundcloud\.com/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC NHẠC SOUNDCLOUD */
                var res = (await axios.get(`https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/soundcloud/download?apikey=kzkhanhz7517222606&link=${str}`));
                const stream = (await axios.get(res.data.result.download, { responseType: "arraybuffer" })).data;
                const path = __dirname + `/cache/1.mp3`;
                fs.writeFileSync(path, Buffer.from(stream, "utf-8"));
                o.api.sendMessage({
                    body: ``,
                    attachment: fs.createReadStream(path)
                }, o.event.threadID, () => fs.unlinkSync(path), o.event.messageID);
            } else if (/zingmp3\.vn/.test(str)) {
                /* TỰ ĐỘNG TẢI NHẠC ZINGMP3 */
                send({ body: `${head('ZINGMP3')}\n`, attachment: await streamURL(`https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/zingmp3/download?apikey=kzkhanhz7517222606&link=${str}`, 'mp3') });
            } else if (/(^https:\/\/)((www)\.)?(pinterest|pin)*\.(com|it)\//.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO PINTEREST */
                const res = await axios.get(`https://api.imgbb.com/1/upload?key=588779c93c7187148b4fa9b7e9815da9&image=${str}`);
                send({
                    body: `${head('PINTEREST')}\n- link: ${res.data.data.image.url}`, attachment: await streamURL(res.data.data.image.url, 'jpg')
                });
            } else if (/(^https:\/\/)((www)\.)?(twitter)\.(com)\//.test(str)) {
                /* TỰ ĐỘNG TẢI VIDEO TWITTER */
                const apiUrl = `https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/twitter/get?url=${str}`;
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
                const apiUrl = `https://88a09d18-0a10-4ac1-9aa7-35e6da1ad8ce-00-1ph67irjzn20k.sisko.replit.dev/fbdownload?url=${str}`;
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
                const res = await axios.get(`https://apitntxtrick.onlitegix.com/downall?link=${str}`);
                const { medias, title } = res.data; // Adjust according to your API response structure

                let attachment = [];

                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

                if (medias.length > 0) {
                    for (const item of medias) {
                        await delay(1000); // Đợi 1 giây giữa các lần tải
                        if (item.type === 'image') {
                            attachment.push(await streamURL(item.url, 'png')); // Adjust streamURL function based on your needs
                        } else if (item.type === 'video') {
                            attachment.push(await streamURL(item.url, 'mp4')); // Adjust streamURL function based on your needs
                        }
                    }
                    send({
                        body: `${head('INSTAGRAM')}\nTiêu Đề: ${title || 'Không có tiêu đề'}`, // Use title from API response
                        attachment
                    });
                }
            }
            else if (/threads\.net/.test(str)) {
                /* TỰ ĐỘNG TẢI ẢNH HOẶC VIDEO THREADS */
                const res = await axios.get(`https://apitntxtrick.onlitegix.com/downall?link=${str}`);
                const data = res.data;
                let attachment = [];

                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

                if (data.medias.length > 0) {
                    for (const item of data.medias) {
                        await delay(1000); // Đợi 1 giây giữa các lần tải
                        if (item.type === 'video') {
                            attachment.push(await streamURL(item.url, 'mp4'));
                        } else if (item.type === 'image') {
                            attachment.push(await streamURL(item.url, 'png'));
                        }
                    }

                    const caption = data.title || 'Không có tiêu đề';
                    const username = data.user.username || 'Không có tên người dùng';
                    const profilePic = data.user.profile_pic_url || '';

                    send({
                        body: `${head('THREADS')}\nTiêu Đề: ${caption}\nNgười dùng: ${username}\n`,
                        attachment
                    });
                }
            }
  else if(/catbox\.moe/.test(str)){
                  send({body: `${head('FILE-CATBOX')}\n`,attachment: await streamURL(str, str.split('.').pop()) })
              }

        }
    } catch (e) {
        console.log('Error', e);
    }
};

exports.run = () => {};
exports.config = {
    name: 'atd',
    version: '1',
    hasPermssion: 0,
    credits: 'Công Nam',
    description: '',
    commandCategory: 'Tiện ích',
    usages: [],
    cooldowns: 1
};

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


function infoPostTT(url) {
    return axios({
        method: 'post',
        url: `https://tikwm.com/api/`,
        data: {
            url
        },
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.data.data);
}
