const getQuestion = require('../questions/questions');

const buildModal1 = () => {
  const blocks = [];
  blocks.push({
    "type": "section",
    "text": {
      "type": "plain_text",
      "text": "背景画像を選択してください。",
      "emoji": true
    }
  });
  for (let i = 1; i <= 10; i++) {
    const imageName = 'Image' + i;
    const value = ('00' + i).slice(-2);
    blocks.push({
      type: "divider",
    });
    blocks.push(
      {
        type: "image",
        title: {
          type: "plain_text",
          text: " ",
          emoji: true,
        },
        image_url:
          `https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-${value}.png`,
        alt_text: imageName,
      });
    var actionsBlock = {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "この背景で投稿",
            emoji: true,
          },
          value: value,
        },
      ],
    }
    blocks.push(actionsBlock);
  }
  return blocks;
}
module.exports = buildModal1;
