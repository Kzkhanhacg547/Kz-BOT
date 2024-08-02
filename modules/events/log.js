module.exports.config = {
    name: "log",
    eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name", "log:admin-change", "log:message-reply"],
    version: "1.1.0",
    credits: "Mirai Team",
    description: "Log bot activities with detailed notifications!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function ({ api, event, Threads, Users }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;

    var formReport = "=== 『 𝗕𝗼𝘁 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 』 ===\n━━━━━━━━━━━━━━━━━━\n" +
        "\n\n→ [🧸] 𝗧𝗵𝗿𝗲𝗮𝗱 𝗺𝗮𝗻𝗴 𝗜𝗗: " + event.threadID +
        "\n→ [🌸] 𝗛𝗮̀𝗻𝗵 đ𝗼̣̂𝗻𝗴: {task}" +
        "\n→ [👤] 𝗛𝗮̀𝗻𝗵 đ𝗼̣̂𝗻𝗴 đ𝘂̛𝗼̛̣𝗰 𝘁𝗮̣𝗼 𝗯𝗼̛̉𝗶 𝘂𝘀𝗲𝗿𝗜𝗗: " + event.author +
        "\n→ [🕒] 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: " + new Date().toLocaleString() +
        "\n→ [🌍] 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: {userName}" +
        "\n→ [🐸] " + Date.now() + "",
        task = "";

    const userName = (await Users.getData(event.author)).name || "Unknown User";

    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "𝗧𝗲̂𝗻 𝗞𝗵𝗼̂𝗻𝗴 𝗧𝗼̂̀𝗻 𝗧𝗮̣𝗶",
                newName = event.logMessageData.name || "𝗧𝗲̂𝗻 𝗞𝗵𝗼̂𝗻𝗴 𝗧𝗼̂̀𝗻 𝗧𝗮̣𝗶";
            task = "⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝘁𝗵𝗮𝘆 đ𝗼̂̉𝗶 𝘁𝗲̂𝗻 𝗻𝗵𝗼́𝗺 𝘁𝘂̛̀: '" + oldName + "' 𝘁𝗵𝗮̀𝗻𝗵 '" + newName + "'";
            await Threads.setData(event.threadID, { name: newName });
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
                task = "⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝘁𝗵𝗲̂𝗺 𝗯𝗼𝘁 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺 𝗺𝗼̛́𝗶!";
            } else {
                const addedParticipants = event.logMessageData.addedParticipants.map(participant => participant.userFbId).join(', ');
                task = `⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝘁𝗵𝗲̂𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺: ${addedParticipants}`;
            }
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
                task = "⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝗸𝗶𝗰𝗸 𝗯𝗼𝘁 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺";
            } else {
                const leftParticipant = event.logMessageData.leftParticipantFbId;
                task = `⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝗿𝗼̛̀𝗶 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺: ${leftParticipant}`;
            }
            break;
        }
        case "log:admin-change": {
            const adminChangeType = event.logMessageData.ADMIN_EVENT;
            const targetUser = event.logMessageData.TARGET_ID;
            if (adminChangeType === 'add_admin') {
                task = `⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${targetUser} 𝗱𝗮̃ 𝗱𝘂̛𝗼̛̣𝗰 𝗰𝗮̣̂𝗽 𝗾𝘂𝘆𝗲̂̀𝗻 𝗮𝗱𝗺𝗶𝗻`;
            } else if (adminChangeType === 'remove_admin') {
                task = `⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${targetUser} 𝗱𝗮̃ 𝗯𝗶̣ 𝘁𝗵𝗮𝗼̉ 𝗰𝗮̣̂𝗽 𝗾𝘂𝘆𝗲̂̀𝗻 𝗮𝗱𝗺𝗶𝗻`;
            }
            break;
        }
        case "log:message-reply": {
            const repliedMessageID = event.logMessageData.replied_message_id;
            task = `⚔️𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${event.author} 𝗱𝗮̃ 𝗻𝗵𝗮̆́𝗻 𝘁𝗶𝗻 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝗼́ 𝗠𝗘𝗦𝗦𝗔𝗚𝗘_𝗜𝗗: ${repliedMessageID}`;
            break;
        }
        default:
            break;
    }

    if (task.length == 0) return;

    formReport = formReport.replace(/\{task}/g, task).replace(/\{userName}/g, userName);

    for (let i = 0; i < global.config.ADMINBOT.length; i++) {
        api.sendMessage(formReport, global.config.ADMINBOT[i], (error, info) => {
            if (error) {
                logger(formReport, "[ Logging Event ]");
            }
        });
    }
};
