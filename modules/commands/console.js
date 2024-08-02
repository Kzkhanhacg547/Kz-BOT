const chalk = require("chalk");
const moment = require("moment-timezone");

function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "JRT",
  description: "Console bớt nhàm chán hơn",
  commandCategory: "Hệ thống",
  usages: "console",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event, args, Users, Threads }) {
  const { configPath } = global.client;
  const { DeveloperMode } = global.config;
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);
  const modDev = config.DeveloperMode;

  if (this.config.credits !== "JRT" || modDev) return;

  const currentTime = moment.tz("Asia/Ho_Chi_Minh");
  const gio = currentTime.format("D/MM/YYYY || HH:mm:ss");
  const thu = currentTime.locale("vi").format("dddd");
  const msg = event.body || "Ảnh, video hoặc ký tự đặc biệt";

  const threadInfo = await api.getThreadInfo(event.threadID);
  const threadName = threadInfo.threadName || "Tên đã bị gạch sổ";
  const randomColor = getRandomColor();
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();
  const randomColor4 = getRandomColor();
  const randomColor5 = getRandomColor();

  const name = await Users.getNameUser(event.senderID);

  return console.log(
    chalk.bold.hex("#" + randomColor4)(
      `━━━━━━━━━━━━━━━━━| ${threadName} |━━━━━━━━━━━━━━━━━`
    ) +
    chalk.bold.hex("#" + randomColor4)(`\n`) +
    chalk.bold.hex("#" + randomColor)(`BOX: `) +
    chalk.hex("#" + randomColor1)(`${threadName}`) +
    chalk.bold.hex("#" + randomColor)(`\nNAME: `) +
    chalk.bold.hex("#" + randomColor2)(`${name}`) +
    chalk.bold.hex("#" + randomColor)(`\nMESSAGE: `) +
    chalk.hex("#" + randomColor3)(`${msg}`) +
    chalk.bold.hex("#" + randomColor)(`\nTIME: `) +
    chalk.bold.hex("#" + randomColor5)(`${thu} || ${gio}\n`) +
    chalk.bold.hex("#" + randomColor4)(
      `━━━━━━━━━━━━━━━━━| ${name} |━━━━━━━━━━━━━━━━━`
    )
  );
};

module.exports.run = async ({ api, event, args }) => {
  const { configPath } = global.client;
  const { DeveloperMode } = global.config;
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);
  const modDev = config.DeveloperMode;

  if (this.config.credits !== "JRT") {
    return api.sendMessage(`cre`, event.threadID, event.messageID);
  }

  if (modDev) {
    api.sendMessage(
      `→ DeveloperMode: ${modDev}\n→ Vui lòng chỉnh về false để sử dụng!!!`,
      event.threadID
    );
  } else {
    api.sendMessage(`→ DeveloperMode: ${modDev}\n→ Console đang chạy...`, event.threadID);
  }
};
