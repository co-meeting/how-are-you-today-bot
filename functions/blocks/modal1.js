const modal1 =
  [
    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "action_id": "title",
        "placeholder": {
          "type": "plain_text",
          "text": "What do you want to ask of the world?"
        }
      },
      "label": {
        "type": "plain_text",
        "text": "今朝食べたご飯は？"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "action_id": "add_option1",
          "text": {
            "type": "plain_text",
            "text": "Image 1"
          }
        },
        {
          "type": "button",
          "action_id": "add_option2",
          "text": {
            "type": "plain_text",
            "text": "Image 2"
          }
        }
      ]
    },
    {
      "block_id": "my_block_id",
      "type": "input",
      "optional": true,
      "label": {
        "type": "plain_text",
        "text": "Select a channel to post the result on",
      },
      "element": {
        "action_id": "my_action_id",
        "type": "conversations_select",
        "response_url_enabled": true,
      },
    },
  ];
module.exports = modal1;