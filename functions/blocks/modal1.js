const getQuestion = require('../questions/questions');

const buildModal1 = (selectedImage) => {
  console.log(selectedImage);
  const blocks = [
    {
      type: "input",
      block_id: "question",
      element: {
        action_id: "answer",
        type: "plain_text_input",
      },
      label: {
        type: "plain_text",
        text: getQuestion(),
        emoji: true,
      },
    },
  ];
  for (let i = 1; i <= 10; i++) {
    const imageName = 'Image' + i;
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
          `https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-${('00' + i).slice(-2)}.png`,
        alt_text: imageName,
      });
    var actionsBlock = {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "選択",
            emoji: true,
          },
          value: imageName,
        },
      ],
    }
    if (imageName === selectedImage) {
      actionsBlock.elements[0].text.text = "✓ 選択"
      actionsBlock.elements[0].style = "primary";
    }
    blocks.push(actionsBlock);
  }
  return blocks;
}
module.exports = buildModal1;
