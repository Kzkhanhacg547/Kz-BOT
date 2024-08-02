const os = require('os');
const moment = require('moment-timezone');
const fs = require('fs').promises;
const nodeDiskInfo = require('node-disk-info');

module.exports = {
    config: {
        name: "uptreo",
        version: "2.1.4",
        hasPermission: 0,
        credits: "Vtuan rmk Niio-team",
        description: "Display system information of the bot!",
        commandCategory: "System",
        usages: "",
        cooldowns: 5,
    },
    run: async ({ api, event, Users }) => {
        const startPing = Date.now();

        const getDependencyCount = async () => {
            try {
                const packageJsonString = await fs.readFile('package.json', 'utf8');
                const packageJson = JSON.parse(packageJsonString);
                return Object.keys(packageJson.dependencies).length;
            } catch (error) {
                console.error('❎ Cannot read package.json file:', error);
                return -1;
            }
        };

        const getStatusByPing = (ping) => ping < 200 ? 'smooth' : ping < 800 ? 'average' : 'lag';

        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = process.memoryUsage().rss; // RSS: Resident Set Size
        const uptime = process.uptime();
        const [uptimeHours, uptimeMinutes, uptimeSeconds] = [
            Math.floor(uptime / 3600),
            Math.floor((uptime % 3600) / 60),
            Math.floor(uptime % 60)
        ];
        const name = await Users.getNameUser(event.senderID);
        const dependencyCount = await getDependencyCount();
        const botStatus = getStatusByPing(Date.now() - startPing);

        try {
            const disks = await nodeDiskInfo.getDiskInfo();
            const firstDisk = disks[0] || {};

            const convertToGB = (bytes) => bytes ? (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB' : 'N/A';

            const pingReal = Date.now() - startPing;

            const replyMsg = `
📅 Ngày: ${moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')}
⌚ Giờ hiện tại: ${moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss')}
⌛ Uptime: ${uptimeHours.toString().padStart(2, '0')}:${uptimeMinutes.toString().padStart(2, '0')}:${uptimeSeconds.toString().padStart(2, '0')}
══════════════════════════
🤖 Trạng thái bot: ${botStatus}

💻 Bộ nhớ:
    📥 RAM trống: ${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB
    📤 RAM đang dùng: ${(usedMemory / 1024 / 1024).toFixed(2)} MB
    💾 Dung lượng trống: ${convertToGB(firstDisk.available)} GB
    📦 Tổng số package: ${dependencyCount >= 0 ? dependencyCount : "Không rõ"}
    🌐 Ping: ${pingReal} ms

👤 Yêu cầu bởi: ${name}
`.trim();

            api.sendMessage(replyMsg, event.threadID, event.messageID);
        } catch (error) {
            console.error('❎ Error getting disk information:', error.message);
        }
    }
};
