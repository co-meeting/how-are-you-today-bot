## ローカル開発

事前準備

```
firebase functions:config:set slack.token=<ボットのアクセストークン>
firebase functions:config:set slack.channel=<投稿先のチャンネル名>
firebase functions:config:get > functions/.runtimeconfig.json
```
