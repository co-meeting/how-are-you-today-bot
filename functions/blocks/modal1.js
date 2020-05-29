const getQuestion = require('../questions/questions');

const modal1 = [
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
  {
    type: "divider",
  },
  {
    type: "image",
    title: {
      type: "plain_text",
      text: " ",
      emoji: true,
    },
    image_url:
      "https://raw.githubusercontent.com/co-meeting/how-are-you-today-bot/master/images/how-are-you-01.png?token=AJ5M4CVZAWN6K54ZYSHAUYK63IATG",
    alt_text: "Image1",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "選択",
          emoji: true,
        },
        value: "Image1",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "image",
    title: {
      type: "plain_text",
      text: " ",
      emoji: true,
    },
    image_url:
      "https://raw.githubusercontent.com/co-meeting/how-are-you-today-bot/master/images/how-are-you-02.png?token=AJ5M4CQIFLH6POGA3KWTKQ263IAXW",
    alt_text: "Image2",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "選択",
          emoji: true,
        },
        value: "Image2",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "image",
    title: {
      type: "plain_text",
      text: " ",
      emoji: true,
    },
    image_url:
      "https://raw.githubusercontent.com/co-meeting/how-are-you-today-bot/master/images/how-are-you-03.png?token=AJ5M4CSCB3BN5DK235MXBES63IAZW",
    alt_text: "Image3",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "✔️ 選択",
          emoji: true,
        },
        style: "primary",
        value: "Image3",
      },
    ],
  },
  {
    type: "divider",
  },
];
module.exports = modal1;
