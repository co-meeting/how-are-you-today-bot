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
      "https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-01.png",
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
      "https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-02.png",
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
      "https://co-meeting.github.io/how-are-you-today-bot/images/how-are-you-03.png",
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
