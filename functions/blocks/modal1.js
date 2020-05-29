const modal1 = [
  {
    type: "input",
    element: {
      type: "plain_text_input",
    },
    label: {
      type: "plain_text",
      text: "昨日何しましたか？（日々のランダム質問）",
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
      text: "今日の気分1",
      emoji: true,
    },
    image_url:
      "https://user-images.githubusercontent.com/41602570/82641955-1b6e1900-9c48-11ea-85ba-9e50f2ebd3c1.png",
    alt_text: "Example Image",
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
        value: "kyounokibunn1",
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
      text: "今日の気分2",
      emoji: true,
    },
    image_url:
      "https://user-images.githubusercontent.com/41602570/82643334-4c4f4d80-9c4a-11ea-973b-d9a098d9779b.png",
    alt_text: "Example Image",
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
        value: "kyounokibunn2",
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
      text: "今日の気分3",
      emoji: true,
    },
    image_url:
      "https://user-images.githubusercontent.com/41602570/82643425-6ee16680-9c4a-11ea-97f4-1c6a1a336b67.png",
    alt_text: "Example Image",
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
        value: "kyounokibunn3",
      },
    ],
  },
  {
    type: "divider",
  },
];
module.exports = modal1;
