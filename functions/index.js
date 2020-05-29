const functions = require('firebase-functions');

const { App } = require("@slack/bolt");

const fetch = require('node-fetch');
const { createReadStream } = require('fs');

const modal1 = require('./blocks/modal1');
const modal2 = require('./blocks/modal2');

const getQuestion = require('./questions/questions');

const {
  token, channel, signing_secret: signingSecret
} = functions.config().slack;

const app = new App({
  token,
  signingSecret
});

function viewsOpen(payload, res) {
  const body = {
    "trigger_id": payload.trigger_id,
    "view": {
      "type": "modal",
      "callback_id": payload.callback_id,
      "title": {
        "type": "plain_text",
        "text": "今日の気分は？"
      },
      "submit": {
        "type": "plain_text",
        "text": "投稿",
        "emoji": true
      },
      "blocks": modal1,
    }
  };
  console.log(JSON.stringify(body));
  fetch('https://slack.com/api/views.open', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    res.send('OK');
    return;
  }).catch((err) => {
    console.log(err);
  })
}

async function postMessage(payload, res) {
  try {
    const user = await app.client.users.info({
      token,
      user: payload.user.id
    });
    // TODO: 画像合成でuser.user.profile.image_48を使用する
    const question = getQuestion();
    const answer = payload.view.state.values.question.answer.value;
    const file = await app.client.files.upload({
      token,
      channels: channel,
      initial_comment: `Q:「${question}」\n<@${payload.user.id}>:「${answer}」`,
      file: createReadStream('./sample_image.png')
    });
    console.log(file);
    return file;
  } catch (err) {
    console.error(err);
  }
  return '';
}

exports.shortcut = functions.https.onRequest(async (req, res) => {
  console.log(req.body)
  const payload = JSON.parse(req.body.payload);
  console.log(payload.type);
  if (payload.type === 'shortcut') {
    viewsOpen(payload, res);
  } else
    if (payload.type === 'view_submission') {
      postMessage(payload, res);
      // 待たずに返す
      const body = {
        "response_action": "update",
        "view": {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "今日の気分は？"
          },
          "blocks": modal2
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    } else {
      res.sendStatus(404);
    }
});