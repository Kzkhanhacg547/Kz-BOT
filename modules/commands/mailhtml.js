module.exports.config = {
  name: "mailhtml",
  version: "1.1.0",
  hasPermission: 2,
  credits: "ShinTHL09",
  description: "Send Mail with attachments",
  commandCategory: "BOT VIP",
  usages: "<recipient email> | <subject> | <content> | <file URLs>",
  cooldowns: 5,
  dependencies: {}
  // Cài đặt nodemailer: npm install --save nodemailer
};

const nodemailer = require('nodemailer');

module.exports.run = async function({ api, args, Users, event }) {
  const adminEmail = 'basilmailtd@gmail.com';
  const adminPassword = 'uzxtolejmfoyrzcd';
  const mailHost = 'smtp.gmail.com';
  const mailPort = 465;

  const { threadID, messageID } = event;
  const input = args.join(' ');
  const [email, subjectRaw, contentRaw, fileUrlsRaw] = input.split('|').map(item => item.trim());

  if (!email || !subjectRaw || !contentRaw) {
    return api.sendMessage('Vui lòng nhập đúng định dạng: email | tiêu đề | nội dung | liên kết tệp (tùy chọn)', threadID, messageID);
  }

  const subject = subjectRaw.replace(/\\n|\/n/g, "<br>").replace(/-/g, "|");
  const content = contentRaw.replace(/\\n|\/n/g, "<br>").replace(/-/g, "|");
  const htmlContent = `${content}`;

  let attachments = [];
  if (fileUrlsRaw) {
    const fileUrls = fileUrlsRaw.split(',').map(url => url.trim());
    attachments = fileUrls.map(url => ({
      filename: url.split('/').pop(),
      path: url
    }));
  }

  try {
    await sendEmail(email, subject, htmlContent, attachments, adminEmail, adminPassword, mailHost, mailPort);
    api.sendMessage(
      `====== [ SUCCESSFUL ] ======\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `┏ 👤 FROM\n` +
      `┡ ${adminEmail}\n` +
      `│\n` +
      `┟👥 TO\n` +
      `┗ ${email}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🗣️ TITLE ► ${subject}\n\n` +
     // `📃 CONTENT ► ${content}\n` +
      `===========================`,
      threadID,
      messageID
    );
  } catch (error) {
    api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, threadID, messageID);
  }
};

async function sendEmail(to, subject, htmlContent, attachments, adminEmail, adminPassword, mailHost, mailPort) {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: true,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });

  const mailOptions = {
    from: adminEmail,
    to,
    subject,
    html: htmlContent,
    attachments
  };

  await transporter.sendMail(mailOptions);
}
