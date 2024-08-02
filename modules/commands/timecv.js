const { createCanvas, loadImage, registerFont } = require('canvas');
const moment = require('moment-timezone');
const fs = require('fs');

module.exports.config = {
    name: "timecv",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kz Khánhh",
    description: "Gắn thời gian và ngày vào ảnh",
    commandCategory: "Hình ảnh",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event }) {
    const canvas = createCanvas(600, 400);
    const ctx = canvas.getContext('2d');

    // Load background image
    const background = await loadImage("https://i.imgur.com/PhUQZK4.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set font style
    ctx.font = 'bold 30px Arial';

    // Get current date and time
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const date = moment.tz('Asia/Ho_Chi_Minh').format('dddd, D/MM/YYYY');

    // Define rainbow colors
    const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

    // Draw rainbow text on canvas
    let x = 150;
    for (let i = 0; i < time.length; i++) {
        ctx.fillStyle = rainbowColors[i % rainbowColors.length];
        ctx.fillText(time[i], x, 250);
        x += ctx.measureText(time[i]).width;
    }

    x = 150;
    for (let i = 0; i < date.length; i++) {
        ctx.fillStyle = rainbowColors[i % rainbowColors.length];
        ctx.fillText(date[i], x, 300);
        x += ctx.measureText(date[i]).width;
    }

    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/jpeg');

    // Save buffer to file
    fs.writeFileSync('time_image.jpg', buffer);

    // Send image in chat
    api.sendMessage({
        attachment: fs.createReadStream('time_image.jpg'),
        body: 'Time and Date'
    }, event.threadID, () => fs.unlinkSync('time_image.jpg'));
}
