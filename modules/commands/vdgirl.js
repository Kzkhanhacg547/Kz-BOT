const API = global.config.API.domain1;
const fs = require("fs-extra");
const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
		name: "vdgirl",
		version: "1.0.1",
		hasPermssion: 2,
		credits: "Kz Khánh",
		description: "Displays a video of girls with additional bot info.",
		commandCategory: "Tiện ích",
		usages: "",
		cooldowns: 0,
		dependencies: {
				"fs-extra": "",
				"request": ""
		}
};

function byte2mb(bytes) {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getFormattedTime() {
		const time = process.uptime();
		const hours = Math.floor(time / (60 * 60));
		const minutes = Math.floor((time % (60 * 60)) / 60);
		const seconds = Math.floor(time % 60);
		return { hours, minutes, seconds };
}

function getFormattedDate() {
		const now = moment.tz("Asia/Ho_Chi_Minh");
		const date = now.format("DD/MM/YYYY - HH:mm:ss");
		const dayMap = {
				"Sunday": "Chủ Nhật",
				"Monday": "Thứ Hai",
				"Tuesday": "Thứ Ba",
				"Wednesday": "Thứ Tư",
				"Thursday": "Thứ Năm",
				"Friday": "Thứ Sáu",
				"Saturday": "Thứ Bảy"
		};
		const day = dayMap[now.format('dddd')] || now.format('dddd');
		return { date, day };
}

module.exports.handleEvent = async ({ args, event, api, Users }) => {
		const { threadID, messageID, body, senderID } = event;
		const thread = global.data.threadData.get(threadID) || {};

		if (typeof thread["vdgirl", "vdgai"] !== "undefined" && thread["chill"] === false) return;

		if (senderID === api.getCurrentUserID()) return;

		const timeStart = Date.now();
		const { hours, minutes, seconds } = getFormattedTime();
		const { date, day } = getFormattedDate();
		const name = await Users.getNameUser(senderID);
		const namebot = global.config.BOTNAME;
		const PREFIX = global.config.PREFIX;

		const response = await axios.get(`${API}/thinh`);
		const thinh = response.data.data;

		const msg = {
				body: `✨=「 𝐕𝐢𝐝𝐞𝐨 𝐆á𝐢 ✨」=✨\n` +
							`━━━━━━━━━━━━━━━\n` +
							`❤️‍🩹 𝐓𝐡í𝐧𝐡: ${thinh}\n` +
							`━━━━━━━━━━━━━━━\n` +
							`🛸 𝗣𝗿𝗲𝗳𝗶𝘅: ${PREFIX}\n` +
							`⚙️ 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}ms\n` +
							`👩‍💻 𝐇𝐢ệ𝐧 𝐭ạ𝐢 ${namebot} đẫ 𝐨𝐧𝐥𝐢𝐧𝐞 đượ𝐜: \n` +
							`➠ ${hours} giờ ${minutes} phút ${seconds} giây\n` +
							`⏰ 𝐁â𝐲 𝐠𝐢ờ 𝐥à: ${day}\n` +
							`    ${date}\n` +
							`━━━━━━━━━━━━━━━`,
				attachment: (await axios({
						url: (await axios(`${API}/vdgirl`)).data.url,
						method: "GET",
						responseType: "stream"
				})).data
		};

		const keywords = ["vdgirl", "vdgai"];
		keywords.forEach(keyword => {
				if (body.toLowerCase() === keyword || body === keyword[0].toUpperCase() + keyword.slice(1)) {
						api.sendMessage(msg, threadID, messageID);
				}
		});
};

module.exports.languages = {
		"vi": {
				"on": "Bật",
				"off": "Tắt",
				"successText": "vdgirl thành công",
		},
		"en": {
				"on": "On",
				"off": "Off",
				"successText": "vdgirl success!",
		}
};

module.exports.run = async ({ api, event, Threads, getText }) => {
		const { threadID, messageID } = event;
		let data = (await Threads.getData(threadID)).data;

		data["vdgirl", "vdgai"] = !(data["vdgirl", "vdgai"]);

		await Threads.setData(threadID, { data });
		global.data.threadData.set(threadID, data);

		api.sendMessage(`${data["vdgirl", "vdgai"] ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
