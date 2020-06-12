const getQuestion = require('../questions/questions');

const modal_input_answer = () => {
  return [
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
}
module.exports = modal_input_answer;
