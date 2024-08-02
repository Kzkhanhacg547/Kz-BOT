module.exports.config = {
  name: "icon_response",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "Tác giả",
  description: "Phản hồi khi nhận được các icon khác nhau",
  commandCategory: "Noprefix",
  usages: "[trống]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ api, event, Users }) => {
  const iconResponses = {
    "🙂": [
      "Icon này thật đáng yêu!",
      "Bạn đang nghĩ gì khi gửi icon này?",
      "Hy vọng bạn đang có một ngày tuyệt vời!",
      "Icon này luôn làm tôi cảm thấy vui!",
      "Bạn có chuyện gì vui muốn chia sẻ không?",
      "Cảm ơn vì đã gửi icon này!",
      "Mỗi lần thấy icon này, tôi lại thấy vui!",
      "Có vẻ như bạn đang có tâm trạng tốt!",
      "Icon này thật thú vị, bạn muốn nói thêm gì không?",
      "Icon này luôn làm sáng bừng ngày của tôi!"
    ],
    "😂": [
      "Haha, bạn thật hài hước!",
      "Câu chuyện này thật vui!",
      "Cười vui vẻ nhé!",
      "Bạn có thêm câu chuyện hài nào không?",
      "Icon này làm tôi cười tít mắt!",
      "Cười thế này mới là vui chứ!",
      "Cười lên nào, đời sẽ vui hơn!",
      "Bạn làm tôi cười rồi đấy!",
      "Có chuyện gì vui muốn chia sẻ không?",
      "Haha, bạn thật là một người vui tính!"
    ],
    "😢": [
      "Ôi, bạn ổn chứ?",
      "Có chuyện gì buồn vậy?",
      "Tôi luôn ở đây nếu bạn cần nói chuyện.",
      "Đừng buồn nữa nhé!",
      "Hy vọng mọi thứ sẽ tốt hơn.",
      "Cố gắng lên, ngày mai sẽ tươi sáng hơn.",
      "Đôi khi khó khăn sẽ qua đi.",
      "Mạnh mẽ lên nhé!",
      "Bạn có muốn chia sẻ thêm không?",
      "Hy vọng bạn sẽ cảm thấy khá hơn."
    ],
    "❤️": [
      "Icon này thật ngọt ngào!",
      "Cảm ơn bạn rất nhiều!",
      "Tình yêu là điều tuyệt vời nhất!",
      "Bạn thật dễ thương!",
      "Cảm ơn vì đã gửi yêu thương này!",
      "Bạn là người tuyệt vời!",
      "Hy vọng bạn luôn tràn đầy yêu thương!",
      "Icon này làm ấm lòng tôi!",
      "Bạn làm ngày của tôi tốt hơn!",
      "Tôi cũng yêu bạn!"
    ]
  };

  try {
    let userName = await Users.getNameUser(event.senderID);
    let iconResponse = iconResponses[event.body];
    if (iconResponse) {
      return api.sendMessage(
        `${iconResponse[Math.floor(Math.random() * iconResponse.length)]}, ${userName}!`,
        event.threadID, 
        event.messageID
      );
    }
  } catch (error) {
    console.error("Error in handleEvent:", error);
  }
}

module.exports.run = async ({ api, event, Users }) => {
  const timeOfDayResponses = [
    "Chào buổi sáng, bạn cần giúp gì không?",
    "Chào buổi chiều, có gì tôi giúp được không?",
    "Chào buổi tối, có gì bạn muốn chia sẻ không?",
    "Xin chào, bạn cần giúp gì không?"
  ];

  try {
    let userName = await Users.getNameUser(event.senderID);
    let currentHour = new Date().getHours();
    let timeOfDayMessage;

    if (currentHour < 12) {
      timeOfDayMessage = timeOfDayResponses[0];
    } else if (currentHour < 18) {
      timeOfDayMessage = timeOfDayResponses[1];
    } else {
      timeOfDayMessage = timeOfDayResponses[2];
    }

    return api.sendMessage(`${timeOfDayMessage}, ${userName}!`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error in run:", error);
  }
}
