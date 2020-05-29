const functions = require('firebase-functions');

const { App } = require("@slack/bolt");

const fetch = require('node-fetch');
const modal1 = require('./blocks/modal1');
const modal2 = require('./blocks/modal2');

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
      token: token,
      user: payload.user.id
    });
    const result = await app.client.chat.postMessage({
      token: token,
      channel: channel,
      text: "TODO: show message built from view.state in payload.",
      username: payload.user.username,
      icon_url: user.user.profile.image_48
    });
    console.log(result);
    return result.json();
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
            "text": "Updated view"
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