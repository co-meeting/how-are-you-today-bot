# Slackアプリ「今日のひとこと」

「今日のひとこと」は、リモートワークの雑談のネタを提供し、職場環境を良くするSlackアプリです。

## 使い方

1. 「今日のひとこと」を起動する。
2. 「最近買ったよかったものは？」のような質問が聞かれるので、答えを入力する。
3. 気分に合った背景画像を選んで投稿する。
4. 以下のような画像がSlackに投稿されます。
![image](https://user-images.githubusercontent.com/877015/85718043-1578c580-b729-11ea-8ae1-cd73eae9dbfe.png)
![image](https://user-images.githubusercontent.com/877015/85718813-d26b2200-b729-11ea-89f9-53b046129770.png)

毎朝始業のときに「今日のひとこと」を投稿すれば、リモートワークで不足しがちな雑談のネタを毎日提供します。
毎日続けるとメンバーのことをより知ることができ、より働きやすい職場環境を作ることができます！

## インストール手順

### Slackアプリの設定手順

#### 1. [Slack API: Applications](https://api.slack.com/apps) を開き、アプリを新規作成( `Create New App` )
```
例）
App Name:今日のひとこと
Development Slack Workspace: アプリをインストールしたい組織を選択
```

#### 2. Basic Information を開き、 `Display Information` の内容を変更
```
例）
App Name: 今日のひとこと
Short description: 今日のひとこと
App icon & Preview: 任意のアイコン
Background color: 任意のカラー
```

#### 3. Interactivity & Shortcuts を開き、`Interactivity` を ON に変更
その後、以下の設定を行い `Save Changes`する
   - `Request URL` は後ほど正式に入力するとして、適当に`https://localhost` と入力する
   - `Create New Shortcut` ボタンをクリックして、ショートカットを作成する
```
例）
Where should this shortcut appear? :Global
Name:今日のひとこと
Short Description:　今日のひとこと
Callback ID: how_are_you_today
```

#### 4. OAuth Tokens & Redirect URLs を開き、以下Scopesを追加
 - `chat:write`
 - `users:read`
 - `files:write`

 
#### 5. App Home を開き、Your App’s Presence in Slackを入力
```
例）
Display Name:今日のひとこと
Default username: how_are_you_today
```

#### 6. Install App を開き、 `Install Appto Workspace` ボタンをクリックして組織にへインストール

一度、インストールすると、それ以後、APIの各設定を変更状況に応じて、Reinstall を求められるため、メッセージに応じて`Reinstall App` ボタンをクリッックして、再インストールする


#### 7. SlackのチャンネルにAppを追加
 1. 任意のチャンネルを開き、[詳細]を開く
 2. [その他]を選択し、[アプリを追加する]を選択する
 3. リストから[今日のひとこと]を探して、[追加]ボタンをクリックして追加する

### Firebaseにデプロイ

#### 事前準備

 1. [Firebase console](https://console.firebase.google.com/?hl=ja)にログインする。
 2. consoleで新しいFirebaseのプロジェクトを作成する。プロジェクト名は `how-are-you-today-bot` に設定する。
 3. 作成したFirebaseプロジェクトをBlaze（従量課金）にアップグレードする。
 3. [Firebase CLI](https://firebase.google.com/docs/functions/get-started?authuser=0)をローカルにインストールする。

※別のプロジェクト名を使用する場合は、 `.firebaserc` の内容を書き換えてください。

#### 1.プロジェクトでfirebaseにログイン
```
firebase login
```

#### 2.アクセストークンを登録する

```
firebase functions:config:set slack.token=<ボットのアクセストークン>
firebase functions:config:set slack.channel=<投稿先のチャンネル名>
```

 - <投稿先のチャンネル名> : 「今日のひとこと」を投稿するチャンネル名
 - <ボットのアクセストークン> : Slackアプリ設定ページの `Install App` > `Bot User OAuth Access Token`

#### 3.デプロイする
```
npm run deploy
```

#### 4. Slackアプリ設定の `Request URL`へ設定

FirebaseプロジェクトコンソールでFunctionsを開き、デプロイされた関数のURLを確認する。  
`https://asia-northeast1-<プロジェクト名>.cloudfunctions.net/shortcut` のようなURLになる。  
Slackアプリ設定ページの「Interactivity & Shortcuts」を開き、`Request URL` へそのURLを設定する。

### 以上で、Slackのショートカットから投稿できるようになります。
 
## ローカル開発手順

### 事前準備
 - [ngrok](https://ngrok.com/)コマンドをローカルから実行できるようにインストールする
 

### 1.runtimeconfig.jsonファイルを生成

```
cp functions/.runtimeconfig.json.example functions/.runtimeconfig.json
```

`functions/.runtimeconfig.json` を適切に設定する
 - "channel" : 「今日のひとこと」を投稿するチャンネル名
 - "token" : Slackアプリ設定ページの `Install App` > `Bot User OAuth Access Token`

### 2.npm パッケージのインストール
```
cd functions
npm install
```

### 3.ローカルーサーバーの実行

```
npm run run-local
```

### 4.ngrokを利用しローカルサーバーを外部公開
```
ngrok http 5001
```
上記を実行すると以下のようなメッセージがターミナルに出力される
```
ngrok by @inconshreveable                                                           (Ctrl+C to quit)
                                                                                                    
Session Status                online                                                                
Session Expires               6 hours, 19 minutes                                                   
Version                       2.3.35                                                                
Region                        United States (us)                                                    
Web Interface                 http://127.0.0.1:4040                                                 
Forwarding                    http://xxxxxxxxxxxxxx.ngrok.io -> http://localhost:5001                 
Forwarding                    https://xxxxxxxxxxxxxx.ngrok.io -> http://localhost:5001                
                                                                                                    
Connections                   ttl     opn     rt1     rt5     p50     p90                           
                              16      0       0.00    0.00    1.59    60.92                         
```

### 5.外部公開URLをSlackアプリ設定の `Request URL`へ設定

Slackアプリ設定の「Interactivity & Shortcuts」を開き、`Request URL` へ以下の値を設定

```
<ngrokのHTTPSのURL>/how-are-you-today-bot/us-central1/shortcut
```

例えば、上記のコマンド出力の場合は以下の値になります。
```
https://xxxxxxxxxxxxxx.ngrok.io/how-are-you-today-bot/us-central1/shortcut
```
    
### 以上で、ローカルでSlackアプリを動かすことができます。

