module.exports.config = {
    name: "addkick",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "Kz Khánhh",
    description: "Quản lý người dùng trong nhóm bằng cách kick hoặc add",
    commandCategory: "Box",
    usages: "[add/kick] [tag/reply/all]",
    cooldowns: 0
};

module.exports.run = async function ({ api, event, args, Threads, Users }) {
    const { threadID, messageID, participantIDs, adminIDs } = event;
    const botID = api.getCurrentUserID();

    if (args[0] === 'add') {
        const axios = require('axios');
        const link = args.slice(1).join(" ");

        if (!link) return api.sendMessage({ body: "Cách sử dụng:\n+addkick add <link facebook>\n+addkick add <uid>" }, threadID, messageID);

        let uidUser;

        if (link.indexOf(".com/") !== -1) {
            const res = await api.getUID(args[1] || event.messageReply.body);
            uidUser = res;
        } else {
            uidUser = args[1];
        }

        api.addUserToGroup(uidUser, threadID, (err) => {
            if (participantIDs.includes(uidUser)) return api.sendMessage('Trong nhóm đã có thành viên này rồi', threadID, messageID);
            if (err) return api.sendMessage(`Không thể thêm vào nhóm`, threadID, messageID);
            else if (approvalMode && !adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(`Thành viên đã được thêm vào danh sách phê duyệt`, threadID, messageID);
            else return api.sendMessage(`Thêm thành viên vào nhóm thành công`, threadID, messageID);
        });
    } else if (args[0] === 'kick') {
        try {
            if (args.slice(1).join().indexOf('@') !== -1) {
                var mention = Object.keys(event.mentions);
                for (let o in mention) {
                    setTimeout(() => {
                        return api.removeUserFromGroup(mention[o], threadID);
                    }, 1000);
                }
            } else {
                if (event.type == "message_reply") {
                    uid = event.messageReply.senderID;
                    return api.removeUserFromGroup(uid, threadID);
                } else {
                    if (!args[1]) return api.sendMessage(`» Kick ai.?`, threadID, messageID);
                    else {
                        if (args[1] == "all") {
                            const listUserID = participantIDs.filter(ID => ID != botID && ID != event.senderID);
                            for (let idUser in listUserID) {
                                setTimeout(() => {
                                    return api.removeUserFromGroup(idUser, threadID);
                                }, 1000);
                            }
                        }
                    }
                }
            }
        } catch {
            return api.sendMessage('» Vĩnh biệt các bạn.', threadID, messageID);
        }
    } else {
        return api.sendMessage('Cách sử dụng: [add/kick] [tag/reply/all]', threadID, messageID);
    }
};
