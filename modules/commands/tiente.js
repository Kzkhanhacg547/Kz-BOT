const axios = require('axios');

module.exports.config = {
  name: "tiente",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kz Khánhh", 
  description: "Đổi giá trị tiền tệ",
  commandCategory: "Hệ thống",
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  if (args.length !== 3) {
    return api.sendMessage("Sử dụng: tiente <số lượng> <đơn vị tiền tệ nguồn> <đơn vị tiền tệ đích>", event.threadID, event.messageID);
  }

  const amount = parseFloat(args[0]);
  const sourceCurrency = args[1].toUpperCase();
  const targetCurrency = args[2].toUpperCase();

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
    const exchangeRate = response.data.rates[targetCurrency];

    if (exchangeRate) {
      const convertedAmount = parseInt(amount * exchangeRate).toString();
      api.sendMessage(`${amount} ${sourceCurrency} = ${convertedAmount} ${targetCurrency}`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`Không thể tìm thấy tỷ giá quy đổi từ ${sourceCurrency} sang ${targetCurrency}`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    api.sendMessage("Đã xảy ra lỗi khi lấy tỷ giá quy đổi. Vui lòng thử lại sau.", event.threadID, event.messageID);
  }
};
