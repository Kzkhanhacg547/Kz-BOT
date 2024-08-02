module.exports.config = {
    name: "fact",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Random interesting facts.",
    commandCategory: "Fun",
    usages: "",
    cooldowns: 5
};

const facts = [
    "Bài hát 'Happy Birthday' có bản quyền và mỗi lần được sử dụng trong một sản phẩm thương mại, phải trả phí cho công ty giữ bản quyền hàng triệu đô la.",
    "Có 1,6% dân số thế giới là bậc thang cuồng chiến lược, tức là họ không thể nhìn thấy một bậc thang mà không muốn bước lên.",
    "Con người sẽ nhanh chóng phát thèm đường sau khi thức dậy vào buổi sáng, nguyên nhân là do cơ thể không còn nhiều đường sau khi dùng hết trong giấc ngủ.",
    "Các con chim cánh cụt không thể uống nước biển vì chúng có thể làm tăng nồng độ muối trong cơ thể và gây ra sự mất nước.",
    "Trong một cuộc khảo sát năm 2005, 37% người Mỹ tin rằng truyện Harry Potter có thể có thật.",
    "Ốc sên có thể ngủ đến 3 năm liền.",
    "Có hơn 300 loài hải cẩu, mỗi loài có một tiếng kêu riêng biệt để liên lạc với đàn.",
    "Đại bàng mắt ấn độ, loài đại bàng lớn nhất thế giới, có thể đẩy trâu rừng nhỏ xuống vực để ăn.",
    "Loài mèo không thích ăn thực phẩm lạ nhưng nếu không được ăn trong thời gian quá lâu, chúng sẽ ăn thậm chí là thức ăn không ngon.",
    "Lỡ vướng mắc trong một cuộc hôn nhân ở Fiji có thể khiến bạn phải trả thêm 2.500 đô la cho các nhà phân phối bia mỗi năm.",
    "Tại thời điểm ra mắt, sản phẩm Coke chỉ là một loại thuốc chữa bệnh ho và giảm cân.",
    "Vì lý do nguyên tắc, Google mua tên miền 'google.com' từ một người đàn ông người Mỹ với giá 12 USD."
];

module.exports.run = ({ api, event }) => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    return api.sendMessage(randomFact, event.threadID);
};
