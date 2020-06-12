const functions = require('firebase-functions');

const { WebClient } = require('@slack/web-api');

const fetch = require('node-fetch');
const { createReadStream } = require('fs');

const { generateImage } = require('./image/generate-image');

const blocks_complete = require('./blocks/complete');
const blocks_input_answer = require('./blocks/input_answer');
const blocks_select_image = require('./blocks/select_image');

const getQuestion = require('./questions/questions');

const { token, channel } = functions.config().slack;

const web = new WebClient(token);

async function viewsOpen(payload, res) {
  try {
    const view = {
      "type": "modal",
      "callback_id": payload.callback_id,
      "title": {
        "type": "plain_text",
        "text": "今日のひとこと"
      },
      "submit": {
        "type": "plain_text",
        "text": "投稿",
        "emoji": true
      },
      "blocks": blocks_input_answer()
    };
    console.log(JSON.stringify(view));
    let response = await web.views.open({
      token,
      trigger_id: payload.trigger_id,
      view: view
    });

    console.log(response);
    res.send('OK');
    return;
  } catch (err) {
    console.error(err);
  }
}

async function postMessage(payload) {
  try {
    const user = await web.users.info({
      token,
      user: payload.user.id
    });
    // TODO: 画像合成でuser.user.profile.image_48を使用する
    const question = getQuestion();
    const answer = payload.view.private_metadata;
    const file = await web.files.upload({
      token,
      filename: '今日のひとこと',
      channels: channel,
      initial_comment: `Q:「${question}」\n<@${payload.user.id}>:「${answer}」`,
      // file: createReadStream('./sample_image.png')
      file: await generateImage(question, answer, user.user)
    });
    console.log(file);
    return file;
  } catch (err) {
    console.error(err);
  }
  return '';
}

exports.shortcut = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  console.log(req.body)
  const payload = JSON.parse(req.body.payload);
  console.log(payload.type);
  switch (payload.type) {
    case 'shortcut':
      viewsOpen(payload, res);
      break;

    case 'view_submission': {
      //viewsOpen(payload, res, payload.actions[0].value);
      const answer = payload.view.state.values.question.answer.value;
      const body = {
        "response_action": "update",
        "view": {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "今日のひとこと"
          },
          "private_metadata": answer,
          "blocks": blocks_select_image()
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
      break;
    }
    case 'block_actions': {
      console.log(payload);
      postMessage(payload, res);
      const body = {
        "response_action": "update",
        "view": {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "今日のひとこと"
          },
          "blocks": blocks_complete()
        }
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));

      break;
    }
    default:
      res.sendStatus(404);

  }
});