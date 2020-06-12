## ローカル開発

事前準備

```
cp functions/.runtimeconfig.json.example functions/.runtimeconfig.json
```

`functions/.runtimeconfig.json` を適切に設定する。


npm パッケージのインストール

```
cd functions
npm install
```

ローカルーサーバーの実行

```
npm run run-local
```

## 本番デプロイ

事前準備

```
firebase functions:config:set slack.token=<ボットのアクセストークン>
firebase functions:config:set slack.channel=<投稿先のチャンネル名>
```
