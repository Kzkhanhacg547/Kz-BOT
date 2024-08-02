const { get } = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
	name: "girlnopre",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "Kz Khánh",
	description: "",
	commandCategory: "Noprefix",
	usages: "noprefix",
	cooldowns: 0,
	denpendencies: { "fs-extra": "", "request": "" }
};

const API = global.config.API.domain1;
const weekdays = {
	'Sunday': 'Chủ Nhật',
	'Monday': 'Thứ Hai',
	'Tuesday': 'Thứ Ba',
	'Wednesday': 'Thứ Tư',
	'Thursday': 'Thứ Năm',
	'Friday': 'Thứ Sáu',
	'Saturday': 'Thứ Bảy'
};

module.exports.handleEvent = async ({ event, api, Users }) => {
	const { threadID, messageID, body, senderID } = event;
	const thread = global.data.threadData.get(threadID) || {};
	if (thread["gái","girl"] !== undefined && thread["chill"] === false) return;
	if (senderID === api.getCurrentUserID()) return;

	const timeStart = Date.now();
	const uptime = process.uptime();
	const hours = Math.floor(uptime / 3600);
	const minutes = Math.floor((uptime % 3600) / 60);
	const seconds = Math.floor(uptime % 60);
	const now = moment.tz("Asia/Ho_Chi_Minh");
	const thinh = (await get(`${API}/thinh`)).data.data;
	const imageUrls = await Promise.all(Array.from({ length: 6 }, async () => (await get(`${API}/girl`)).data.url));
	const attachments = await Promise.all(imageUrls.map(async (url) => (await get({ url, method: "GET", responseType: "stream" })).data));

	const msg = {
		body: `𖤛𖤐==『 𝐆𝐢𝐫𝐥'𝐬 𝐏𝐡𝐨𝐭𝐨 』==𖤐𖤛\nღ 𝐓𝐡í𝐧𝐡: ${thinh}\n❏ 𝐏𝐫𝐞𝐟𝐢𝐱: ${global.config.PREFIX}\n:✯ 𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}ms\n\n➠Bot đã online ${hours} giờ ${minutes} phút ${seconds} giây\n➠𝐍𝐨𝐰: ${weekdays[now.format('dddd')]}\n      ${now.format("DD/MM/YYYY - HH:mm:ss")}\n━━━━━━━━━━━━━`,
		attachment: attachments
	};

	const triggers = ["gái", "girl"];
	triggers.some(trigger => {
		if ([trigger, trigger.toUpperCase(), trigger[0].toUpperCase() + trigger.slice(1)].includes(body)) {
			api.sendMessage(msg, threadID, messageID);
			return true;
		}
	});
};

module.exports.languages = {
	vi: { on: "Bật", off: "Tắt", successText: "gái thành công" },
	en: { on: "on", off: "off", successText: "gái success!" }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
	const { threadID, messageID } = event;
	const data = (await Threads.getData(threadID)).data;

	data["gái","girl"] = !data["gái","girl"];
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);

	api.sendMessage(`${data["gái","girl"] ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
