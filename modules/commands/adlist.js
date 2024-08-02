const getAdminList = async (api, threadID) => {
    try {
        const threadInfo = await api.getThreadInfo(threadID);
        const adminCount = threadInfo.adminIDs.length;
        let listAdmins = '';
        let num = 1;
        for (const admin of threadInfo.adminIDs) {
            const userInfo = (await api.getUserInfo(admin))[admin];
            listAdmins += `${num++}. ${userInfo.name}\nProfile Picture: ${userInfo.profileUrl}\nRole: Admin\n\n`;
        }
        return `Danh sách quản trị viên (${adminCount}):\n${listAdmins}`;
    } catch (error) {
        throw new Error(`Lỗi khi lấy danh sách quản trị viên: ${error.message}`);
    }
};
const getBotAdminList = async (api) => {
    try {
        const ADMINBOT = global.config.ADMINBOT.filter(id => id); // Filter out empty strings
        if (ADMINBOT.length === 0) {
            return "Bot không có admin nào được thiết lập.";
        }
        let msg = [];
        for (const adminID of ADMINBOT) {
            const userInfo = (await api.getUserInfo(adminID))[adminID];
            msg.push(`» ${userInfo.name}\nLink: fb.me/${adminID}\nProfile Picture: ${userInfo.profileUrl}\nRole: Bot Admin\n`);
        }
        return `Danh sách Admin Bot:\n${msg.join("\n")}`;
    } catch (error) {
        throw new Error(`Lỗi khi lấy danh sách Admin Bot: ${error.message}`);
    }
};
const getAllAdmins = async (api, threadID) => {
    try {
        const threadInfo = await api.getThreadInfo(threadID);
        const adminIDs = threadInfo.adminIDs.map(admin => admin.id);
        const ADMINBOT = global.config.ADMINBOT.filter(id => id); // Filter out empty strings
        const allAdminIDs = [...new Set([...adminIDs, ...ADMINBOT])];
        let listAdmins = '';
        let num = 1;
        for (const adminID of allAdminIDs) {
            const userInfo = (await api.getUserInfo(adminID))[adminID];
            const role = adminIDs.includes(adminID) ? 'Admin' : 'Bot Admin';
            listAdmins += `${num++}. ${userInfo.name}\nLink: fb.me/${adminID}\nProfile Picture: ${userInfo.profileUrl}\nRole: ${role}\n\n`;
        }
        return `Danh sách tất cả các quản trị viên:\n${listAdmins}`;
    } catch (error) {
        throw new Error(`Lỗi khi lấy danh sách tất cả quản trị viên: ${error.message}`);
    }
};
module.exports.config = {
    name: "adlist",
    version: "1.2.0",
    hasPermission: 0,
    credits: "Kz Khánhh, Revised by ChatGPT",
    description: "Hiển thị danh sách quản trị viên hoặc danh sách admin bot.",
    commandCategory: "Admin",
    usages: "adlist <1|2|all>",
    cooldowns: 5,
    dependencies: {}
};
module.exports.run = async function({ api, event, args }) {
    if (args.length !== 1 || !["1", "2", "all"].includes(args[0].toLowerCase())) {
        return api.sendMessage("Vui lòng sử dụng cú pháp\nadlist 1 (xem danh sách qtv)\nadlist 2 (xem danh sách admin bot)\nadlist all (xem tất cả quản trị viên)", event.threadID, event.messageID);
    }
    try {
        let response;
        if (args[0] === "1") {
            response = await getAdminList(api, event.threadID);
        } else if (args[0] === "2") {
            response = await getBotAdminList(api);
        } else if (args[0] === "all") {
            response = await getAllAdmins(api, event.threadID);
        }
        return api.sendMessage(response, event.threadID, event.messageID);
    } catch (error) {
        return api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, event.threadID, event.messageID);
    }
};