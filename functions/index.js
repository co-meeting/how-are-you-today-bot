const functions = require('firebase-functions');

const fetch = require('node-fetch');
const modal1 = require('./blocks/modal1')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
function viewsOpen(payload, res) {
  console.log(payload.trigger_id,  payload.callback_id);
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
        "text": "Submit",
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
      'Authorization': 'Bearer xoxb-3783390692-1139957835811-wFQrnD6yIMPfEDHX30CHVe3d'
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

function postMessage(payload, res) {
  const body = {
    "channel": "C061EG9SL",
    "text": "I hope the tour went well, Mr. Wonka."
  };
  console.log(JSON.stringify(body));
  fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer xoxb-3783390692-1139957835811-wFQrnD6yIMPfEDHX30CHVe3d'
    },
  }).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    res.sendStatus(200);
    return;
  }).catch((err) => {
    console.log(err);
  })
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
      res.send('OK');
    } else {
      res.sendStatus(404);
    }
});