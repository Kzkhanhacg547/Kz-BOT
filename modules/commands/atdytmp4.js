const ytdl = require('ytdl-core');
const fs = require('fs-extra');

const downloadVideoFromYoutube = async (link, path) => {
    if (!link) return 'Thiếu link';
    const timestart = Date.now();
    return new Promise(async (resolve, reject) => {
        try {
            const data = await ytdl.getInfo(link);
            const videoStream = ytdl(link, { quality: 'highest' });
            const writeStream = fs.createWriteStream(path);

            let downloadedBytes = 0;
            const totalBytes = parseInt(data.videoDetails.lengthSeconds) * 1000000; // Rough estimate

            videoStream.on('data', (chunk) => {
                downloadedBytes += chunk.length;
                const progress = (downloadedBytes / totalBytes) * 100;
                // You can use this progress value to update a progress bar or log progress
            });

            videoStream.on('error', reject);
            writeStream.on('error', reject);
            videoStream.pipe(writeStream);
            writeStream.on('finish', async () => {
                const result = {
                    title: data.videoDetails.title,
                    dur: Number(data.videoDetails.lengthSeconds),
                    viewCount: data.videoDetails.viewCount,
                    likes: data.videoDetails.likes,
                    uploadDate: data.videoDetails.uploadDate,
                    sub: data.videoDetails.author.subscriber_count,
                    author: data.videoDetails.author.name,
                    timestart,
                };
                resolve(result);
            });
        } catch (error) {
            reject(`Lỗi khi tải xuống video từ YouTube: ${error}`);
        }
    });
};

const convertHMS = value => {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
};

const config = {
    name: 'autodown56',
    hasPermission: 0,
    version: '1.0',
    description: 'atd music',
    credits: 'Sam',
    commandCategory: 'Tiện ích',
    usages: '[args]',
    cooldowns: 5,
};

const handleEvent = async ({ api, event, Threads }) => {
    const m = (await Threads.getData(event.threadID)).data;
    if (m[config.name] === false) return;

    for (const i of event.body.split(' ')) {
        if (i.indexOf('https://') === 0) {
            for (const e of i.split('/')) {
                if (e === 'youtu.be' || e === 'www.youtube.com' || e === 'youtube.com') {
                    const youtube = __dirname + `/cache/${Date.now()}.mp4`;

                    api.sendMessage("Đang tải xuống video, vui lòng đợi...", event.threadID);

                    try {
                        const data = await downloadVideoFromYoutube(i, youtube);

                        if (fs.existsSync(youtube) && fs.statSync(youtube).size > 0) {
                            api.sendMessage(
                                {
                                    body: `\n┏━━━━━━━━━━━━━━━━━━━━┓\n┣➤🎥 Video: ${data.title}\n┣➤⏰ Time: ${convertHMS(data.dur)}\n┗━━━━━━━━━━━━━━━━━━━━┛\n`,
                                    attachment: fs.createReadStream(youtube),
                                },
                                event.threadID,
                                () => fs.unlinkSync(youtube)
                            );
                        } else {
                            api.sendMessage("Không thể tải xuống video. Vui lòng thử lại sau.", event.threadID);
                        }
                    } catch (error) {
                        api.sendMessage(`Lỗi khi tải xuống video: ${error}`, event.threadID);
                    }
                }
            }
        }
    }
};

const run = async ({ api, event, Threads }) => {
    const data = (await Threads.getData(event.threadID)).data;
    data[config.name] = !data[config.name];
    await Threads.setData(event.threadID, { data });
    return api.sendMessage(
        {
            body: `${data[config.name] ? 'Bật' : 'Tắt'} thành công autoDown`,
        },
        event.threadID
    );
};

module.exports = {
    config,
    handleEvent,
    run,
};