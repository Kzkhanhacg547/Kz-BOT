const axios = require('axios');

module.exports.config = {
    name: "doitien",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Đổi tiền từ một đơn vị sang đơn vị khác",
    commandCategory: "Tiện ích",
    usages: "[số tiền] [đơn vị cần đổi từ] [đơn vị cần đổi đến]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID } = event;
    const out = (msg) => api.sendMessage(msg, threadID);

    if (args.length < 3) return out("Thiếu tham số. Vui lòng nhập số tiền, đơn vị cần đổi từ và đơn vị cần đổi đến.");

    const amount = parseFloat(args[0]);
    const fromCurrency = args[1].toUpperCase();
    const toCurrency = args[2].toUpperCase();

    try {
        const responseFrom = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const dataFrom = responseFrom.data;

        if (dataFrom.error) {
            return out("Đã xảy ra lỗi khi lấy tỉ giá. Vui lòng thử lại sau.");
        }

        const exchangeRateFrom = dataFrom.rates[toCurrency];
        if (!exchangeRateFrom) {
            return out("Không tìm thấy đơn vị tiền tệ cần đổi đến trong dữ liệu tỉ giá.");
        }

        const convertedAmountFrom = amount * exchangeRateFrom;
        let reverseExchangeRate = 1 / exchangeRateFrom;
        let reverseConvertedAmount = 1 / amount;

        const responseTo = await axios.get(`https://api.exchangerate-api.com/v4/latest/${toCurrency}`);
        const dataTo = responseTo.data;

        if (dataTo.error) {
            return out("Đã xảy ra lỗi khi lấy tỉ giá. Vui lòng thử lại sau.");
        }

        const exchangeRateTo = dataTo.rates[fromCurrency];
        if (!exchangeRateTo) {
            return out("Không tìm thấy đơn vị tiền tệ cần đổi từ trong dữ liệu tỉ giá.");
        }

        const convertedAmountTo = amount * exchangeRateTo;
        let reverseExchangeRateTo = 1 / exchangeRateTo;

        let message = `${amount} ${fromCurrency} = ${convertedAmountFrom} ${toCurrency}`;

        if (amount > 1) {
            message += `\n———————————————————————
1 ${toCurrency} = ${reverseExchangeRate} ${fromCurrency} 
1 ${fromCurrency} = ${reverseExchangeRateTo} ${toCurrency}`;
        }

        return out(message);
    } catch (error) {
        console.error("Error:", error);
        return out("Đã xảy ra lỗi khi thực hiện đổi tiền. Vui lòng thử lại sau.");
    }
};
