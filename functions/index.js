const functions = require('firebase-functions');

const { WebClient } = require('@slack/web-api');

const fetch = require('node-fetch');
const { createReadStream } = require('fs');

const { generateImage } = require('./image/generate-image');

const buildModal1 = require('./blocks/modal1');
const modal2 = require('./blocks/modal2');

const getQuestion = require('./questions/questions');

const { token, channel } = functions.config().slack;

const web = new WebClient(token);

async function viewsOpen(payload, res, selectedImage) {
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
      "blocks": buildModal1(selectedImage)
    };
    console.log(JSON.stringify(view));
    let response;
    if (selectedImage) {
      response = await web.views.push({
        token,
        trigger_id: payload.trigger_id,
        view: view
      });
    } else {
      response = await web.views.open({
        token,
        trigger_id: payload.trigger_id,
        view: view
      });
    }
    console.log(response);
    res.send('OK');
    return;
  } catch (err) {
    console.error(err);
  }
}

async function postMessage(payload, res) {
  try {
    const user = await web.users.info({
      token,
      user: payload.user.id
    });
    // TODO: 画像合成でuser.user.profile.image_48を使用する
    const question = getQuestion();
    const answer = payload.view.state.values.question.answer.value;
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

    case 'block_actions':
      console.log(payload);
      viewsOpen(payload, res, payload.actions[0].value);

      break;

    case 'view_submission': {
      postMessage(payload, res);
      // 待たずに返す
      const body = {
        "response_action": "update",
        "view": {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "今日のひとこと"
          },
          "blocks": modal2()
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