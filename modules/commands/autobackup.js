module.exports.config = {
  name: "autobackup",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "ProCoderMew",
  description: "Tự động sao lưu dữ liệu",
  commandCategory: "Hệ thống",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "path": "",
    "moment-timezone": "",
  },
};

module.exports.onLoad = async function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const dirBackup = path.join(__dirname, "cache", "backup");
  if (!existsSync(dirBackup)) mkdirSync(dirBackup, { recursive: true });
};

module.exports.run = async function ({ api, event, args }) {
  const { readdirSync, createReadStream, unlinkSync, existsSync } =
    global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const moment = global.nodemodule["moment-timezone"];
  const dirBackup = path.join(__dirname, "cache", "backup");
  const fileData = path.join(__dirname, "data", "threadData.json");
  const currentTime = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  const fileName = `${currentTime.replace(/\//g, "-").replace(/:/g, "-")}.json`;

  if (!existsSync(fileData)) return api.sendMessage("Không tìm thấy file dữ liệu để sao lưu", event.threadID);

  const stream = createReadStream(fileData).pipe(
    require("fs").createWriteStream(path.join(dirBackup, fileName))
  );

  stream.on("finish", () => {
    const files = readdirSync(dirBackup).filter((file) => file.endsWith(".json"));

    if (files.length > 5) {
      unlinkSync(path.join(dirBackup, files[0]));
    }

    return api.sendMessage(
      `Sao lưu dữ liệu thành công\nFile: ${fileName}`,
      event.threadID
    );
  });
};
