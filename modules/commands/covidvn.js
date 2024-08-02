module.exports.config = {
    name: "covidvn",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Lấy thông tin về tình hình COVID-19 tại Việt Nam",
    commandCategory: "Công cụ",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const axios = require('axios');
    const res = await axios.get('https://disease.sh/v3/covid-19/countries/vn');
    const data = res.data;

    let msg = `🇻🇳 Tình hình COVID-19 tại Việt Nam 🇻🇳\n\n`
        + `👥 Ca nhiễm: ${data.cases.toLocaleString()} (+${data.todayCases.toLocaleString()} mới)\n`
        + `⚰️ Tử vong: ${data.deaths.toLocaleString()} (+${data.todayDeaths.toLocaleString()} mới)\n`
        + `💪 Hồi phục: ${data.recovered.toLocaleString()} (+${data.todayRecovered.toLocaleString()} mới)\n\n`
        + `Dữ liệu cập nhật lúc: ${new Date(data.updated).toLocaleString('vi-VN')}`

    api.sendMessage(msg, event.threadID);
}