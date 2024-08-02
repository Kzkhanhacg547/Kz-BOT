const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const chalk = require('chalk');
const server = require("./server.js");
const path = require('path');
const fs = require('fs');

const gradient = require('gradient-string'); 
const moment = require("moment-timezone");
var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066", "0033FF", "FF9999", "00FF66", "00FFFF","CCFFFF","8F00FF","FF00CC","FF0000","FF1100","FF3300","FF4400","FF5500","FF6600","FF7700","FF8800","FF9900","FFaa00","FFbb00","FFcc00","FFdd00","FFee00","FFff00","FFee00","FFdd00","FFcc00","FFbb00","FFaa00","FF9900","FF8800","FF7700","FF6600","FF5500","FF4400","FF3300","FF2200","FF1100"];
    var random = 
job[Math.floor(Math.random() * job.length)]      
const express = require('express');
const app = express();

app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/facebook/info', async (req, res, next) => {
  const api = require('./api/facebook_info.js')
  /* const appstate = require('./fbstate.json');
  let cookie = "";
    for (var i of appstate) {
        cookie += i.key + '=' + i.value + ';'
    }
 axios.get('https://business.facebook.com/content_management/', {
        headers: {
            'Host': 'business.facebook.com',
            'cookie': cookie
        }
    }).then(data => {
     let access_token = data.data.split('[{"accessToken":"')[1].split('"')[0];
   console.log(access_token)*/
  var {
    uid: uid
  } = req.query;
  if (!uid) return res.json({
    error: "Vui long nhap uid can xem info"
  });
  api.facebook(uid,).then(data => {
    res.json(data);
  }).catch(err => {
    res.json({ status: false, message: err.message });
  })
  /* }).catch(error =>{
  $ npm install canvas
     console.log(error.stack)
   })*/


})

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

    // Set the content type to audio/mp3
    res.contentType('audio/mp3');

    // Stream the file to the client
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

    // Set the content type to audio/mp3
    res2.contentType('audio/mp3');

    // Stream the file to the client
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
axios.get("https://raw.githubusercontent.com/ThanhAli-Official/GbanMiraiProject/main/package.json").then((res) => {
  const rainbow = chalk.rainbow(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━         *
*                                        *
*   [👤] → Kz BOT                        *
*   [🔰] → Phiên bản: 1.2.15             *
*   [🌸] → Tên: Kz Khánhh                *
*   [🌐] → FB: Kz Khánhh                 *
*   [📞] → SĐT/Zalo: xxxxxxxxxx          *
*   [💌] → Email: xxx@gmail.com   
*                                        *
*                                        *  \n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\n`).stop();
rainbow.render();
const frame = rainbow.frame();
console.log(frame);
});

function startProgram() {
  startBot();
  console.log("Chương trình đang chạy...");

  // Sau khi chạy xong, đợi một khoảng thời gian rồi khởi động lại chương trình
  setTimeout(restartProgram, 1800000); // 1800000v milliseconds = 30 minute
}

function restartProgram() {
  console.log("Khởi động lại chương trình...");
  startProgram();
}

// Bắt đầu chương trình
startProgram();
