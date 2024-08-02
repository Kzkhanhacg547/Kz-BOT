const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const logger = require("./utils/log");
const chalk = require('chalk');
const gradient = require('gradient-string');
const express = require('express');
const chalkercli = require('chalkercli');
const CFonts = require('cfonts');
const path = require('path');
const axios = require('axios');
const os = require('os');
const app = express();
const port = process.env.PORT || 80;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'modules/index.html'));
});


app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'modules/blog_admin.html'));
});

async function startBot(message) {
  if (message) logger(message, "[ Bắt đầu ]");

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", async (codeExit) => {
    if (codeExit !== 0 || (global.countRestart && global.countRestart < 5)) {
      await startBot("Tiến hành khởi động lại...");
      global.countRestart += 1;
      return;
    }
  });

  const rainbow2 = chalkercli.rainbow('━━━━━━━━━━━━━━━━[ INFO FILE ]━━━━━━━━━━━━━━━━━');
  rainbow2.render();

  CFonts.say('Kz BOT', {
    font: 'block',
    align: 'center',
    gradient: ['red', 'magenta']
  });

  child.on("error", (error) => {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });

  logger('Kz Bot', '[ NAME ]');
  logger('Vison: không nhớ', '[ VERSION ]');
}

function displaySystemInfo() {
  console.log('CPU architecture: ', os.arch());
  console.log('Number of CPUs: ', os.cpus().length);
  console.log('Total memory: ', os.totalmem());
  console.log('Free memory: ', os.freemem());
  console.log('Operating system: ', os.type());
}

displaySystemInfo();

async function isBotRunning() {
  // Implement logic to check if the bot is running
  // Return true if running, false otherwise
}

async function getIpInfo() {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const data = response.data;
    const rainbow = gradient.rainbow(`━━━━━━━━━━━━━━━━━[ LOAD INFO SERVER ]━━━━━━━━━━━━━━━━`);
    console.log(rainbow);
    logger(data.ip, '| Địa chỉ IP |');
    logger(data.hostname, '| Tên Miền |');
    logger(data.country, '| Quốc gia |');
    logger(data.city, '| Thành phố |');
    logger(data.org, '| Nhà Mạng |');
  } catch (error) {
    logger('Lỗi: Không thể lấy thông tin IP', error.message);
  }
}

function uptimeCheck() {
  setInterval(async () => {
    const isRunning = await isBotRunning();

    if (!isRunning) {
      logger('Bot is not running. Restarting...', '[ Uptime ]');
      await startBot();
    }
  }, 1 * 60 * 1000);
}

const gradient1 = gradient('red', 'pink', 'orange');
const gradient2 = gradient('#𝖥𝖥00𝖥𝖥', '#𝖥𝖥66𝖥𝖥', '#𝖥𝖥99𝖥𝖥', '#𝖥𝖥𝖢𝖢𝖥𝖥', '#𝖥𝖥𝖥𝖥𝖢𝖢');
const loadingBarLength = 30;
const loadingDelay = 100;

function loading(progress) {
  const percentage = Math.floor(Math.max(0, Math.min(progress, 1)) * 100);
  const completedLength = Math.floor(loadingBarLength * progress);
  const loadingBar = `${'█'.repeat(completedLength)}${'░'.repeat(loadingBarLength - completedLength)}`;

  return `\t\t\t${gradient1(loadingBar)} ${percentage}%`;
}

async function fetchIpInfo() {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    if (response.status === 200) {
      const data = response.data;
      const rainbow = gradient2(`━━━━━━━━━━━━━━━━━[ LOAD INFO SERVER ]━━━━━━━━━━━━━━━━`);
      console.log(rainbow);
      logger(data.ip, '| Địa chỉ IP |');
      logger(data.hostname, '| Tên Miền |');
      logger(data.country, '| Quốc gia |');
      logger(data.city, '| Thành phố |');
      logger(data.org, '| Nhà Mạng |');
    } else {
      logger('Lỗi: Không thể lấy thông tin IP', response.status);
    }
  } catch (error) {
    logger('Lỗi:', error);
  }
}

function hieuungchuyendong() {
  let progress = 0;
  const loadingInterval = setInterval(() => {
    console.clear();
    console.log(chalk.bold(gradient1(`      `)));
    console.log(loading(progress));

    if (progress >= 1) {
      console.log(loading(1));
      console.log(gradient2('\n━━━━━━━━━━━━━━━━━━━[ Thông Tin File ]━━━━━━━━━━━━━━━━━━━━'))
      fetchIpInfo();
      startBot();
      clearInterval(loadingInterval);
    }

    progress += 0.05;
  }, loadingDelay);
}

hieuungchuyendong();

const apiEndpoints = [
  'https://4dd9ea6e-d5a6-4f8f-892c-ce90e4d539b9-00-11lae77drh9zo.janeway.replit.dev/'
];

async function callAPI(url) {
  try {
    await axios.get(url);
    console.log(`Successfully accessed API at: ${url}\n`);
  } catch (error) {
    console.error(`Error accessing API at ${url}:`, error.message);
  }
}

async function performAPICalls() {
  try {
    await Promise.all(apiEndpoints.map(callAPI));
  } catch (error) {
    console.error('Error performing API calls:', error);
  }
}

setInterval(performAPICalls, 150000);