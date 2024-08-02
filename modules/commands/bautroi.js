const axios = require('axios');

module.exports.config = {
    name: "bautroi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Xem bầu trời và thông tin về các vật thể thiên văn",
    commandCategory: "Thông tin",
    usages: "[vật thể]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    const objectName = args.join(" ") || "Mặt Trời";
    const apiUrl = `https://api.le-systeme-solaire.net/rest/bodies/${encodeURIComponent(objectName)}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.error) {
            return out(`Không tìm thấy thông tin về "${objectName}". Vui lòng thử lại với tên vật thể khác.`);
        }

        const { name, englishName, bodyType, aroundPlanet, discoveredBy, discoveryDate, alternativeName, relativeRotationPeriod, age, mass, meanRadius, dimension } = data;

        let message = `Thông tin về ${name || englishName}:\n`;
        message += `- Loại vật thể: ${bodyType}\n`;
        message += aroundPlanet ? `- Quỹ đạo quanh: ${aroundPlanet.planet}\n` : "";
        message += discoveredBy ? `- Được khám phá bởi: ${discoveredBy}\n` : "";
        message += discoveryDate ? `- Ngày khám phá: ${discoveryDate}\n` : "";
        message += alternativeName ? `- Tên khác: ${alternativeName}\n` : "";
        message += relativeRotationPeriod ? `- Chu kỳ quay: ${relativeRotationPeriod}\n` : "";
        message += age ? `- Tuổi: ${age} (tỷ năm)\n` : "";
        message += mass ? `- Khối lượng: ${mass.massValue} ${mass.massExponent}\n` : "";
        message += meanRadius ? `- Bán kính trung bình: ${meanRadius.radValue} ${meanRadius.radExponent}\n` : "";
        message += dimension ? `- Kích thước: ${dimension}\n` : "";

        return out(message);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi tìm kiếm thông tin về vật thể thiên văn. Vui lòng thử lại sau.");
    }
};