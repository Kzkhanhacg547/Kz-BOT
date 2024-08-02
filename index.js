const { spawn } = require("child_process");
const { exec } = require('child_process');
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const chalk = require('chalk');
const gradient = require('gradient-string'); 
const moment = require("moment-timezone");
const express = require('express');
const app = express();
const server = require("./server.js");
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
global.config = require('./config');
const multer = require('multer');

// Fixing the color gradient
var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066", "0033FF", "FF9999", "00FF66", "00FFFF", "CCFFFF", "8F00FF", "FF00CC", "FF0000", "FF1100", "FF3300", "FF4400", "FF5500", "FF6600", "FF7700", "FF8800", "FF9900", "FFaa00", "FFbb00", "FFcc00", "FFdd00", "FFee00", "FFff00", "FFee00", "FFdd00", "FFcc00", "FFbb00", "FFaa00", "FF9900", "FF8800", "FF7700", "FF6600", "FF5500", "FF4400", "FF3300", "FF2200", "FF1100"];
var random = job[Math.floor(Math.random() * job.length)];      

app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './checkcam';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname)));

app.post('/upload', upload.single('snapshot'), (req, res) => {
  res.sendStatus(200);
});

app.get('/cap', (req, res) => {
  res.sendFile(path.join(__dirname, 'checkcam.html'));
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/kz-api', function(req, res) {
    res.sendFile(__dirname + '/kz-api.html');
});

app.get('/facebook/info', async (req, res, next) => {
  const api = require('./api/facebook_info.js');
  var { uid } = req.query;
  if (!uid) return res.json({ error: "Vui long nhap uid can xem info" });
  try {
    const data = await api.facebook(uid);
    res.json(data);
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
});

const mp3Directory = path.join(__dirname, 'mp3');

app.get('/randommp3', (req, res) => {
  fs.readdir(mp3Directory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomMp3File = files[randomIndex];

    const filePath = path.join(mp3Directory, randomMp3File);

    res.contentType('audio/mp3');
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

const mp3Directory2 = path.join(__dirname, 'mp3tet');

app.get('/tet', (req, res2) => {
  fs.readdir(mp3Directory2, (err, files) => {
    if (err) {
      console.error(err);
      return res2.status(500).send('Internal Server Error');
    }

    const randomIndex2 = Math.floor(Math.random() * files.length);
    const randomMp3File2 = files[randomIndex2];

    const filePath = path.join(mp3Directory2, randomMp3File2);

    res2.contentType('audio/mp3');
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res2); 
  });
});

app.listen(80, () => {
  console.log('server started');
});

moment.locale("vi");

const startTime = new Date();
const port = process.env.PORT || 3000;
const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
const ngayKhoiDong = moment(startTime).format("dddd, DD [tháng] MM [năm] YYYY");

const logServerStart = () => {
    console.log(chalk.bold(gradient.summer('\n---------------------------------------------')));
    console.log(chalk.bold(gradient.summer('       MÁY CHỦ ĐÃ BẮT ĐẦU HOẠT ĐỘNG')));
    console.log(chalk.bold(gradient.summer('---------------------------------------------')));
    console.log(chalk.bold(chalk.blue('Cổng:           ') + chalk.hex('#3aed34')(port)));
    console.log(chalk.bold(chalk.blue('Giờ hiện tại:   ') + chalk.hex('#3aed34')(gio)));
    console.log(chalk.bold(chalk.blue('Ngày khởi động: ') + chalk.hex('#3aed34')(ngayKhoiDong)));
    console.log(chalk.bold(gradient.summer('---------------------------------------------\n')));
};

logServerStart();

function startBot(message) {
    (message) ? logger(message, "[ Bắt đầu ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Tiến hành khởi động lại...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Bắt đầu ]");
    });
};

axios.get("https://raw.githubusercontent.com/ThanhAli-Official/GbanMiraiProject/main/package.json")
  .then((res) => {
    const rainbow = gradient.rainbow(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         *
*                                        *
*   [👤] → Kz BOT                        *
*   [🔰] → Phiên bản: 1.2.15             *
*   [🌸] → Tên: Kz Khánhh                *
*   [🌐] → FB: Kz Khánhh                 *
*   [📞] → SĐT/Zalo: xxxxxxxxxx          *
*   [💌] → Email: xxx@gmail.com   
*                                        *
*                                        *  \n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\n`);
    console.log(rainbow);
  })
  .catch((error) => {
    console.error('Error fetching package.json:', error);
  });

function startProgram() {
  startBot();
  console.log("Chương trình đang chạy...");

  // Sau khi chạy xong, đợi một khoảng thời gian rồi khởi động lại chương trình
  setTimeout(restartProgram, 1800000); // 1800000v milliseconds = 30 minutes
}

function restartProgram() {
  console.log("Khởi động lại chương trình...");
  startProgram();
}

// Bắt đầu chương trình
startProgram();

// Global unhandled promise rejection handler
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});
