# Slack 今日のひとことBot の導入方法と開発サンプル


## 事前準備(Slack API設定編)


#### 1.[Slack API: Applications](https://api.slack.com/apps) を開き、アプリを新規作成( `Create New App` )する
```
例）
App Name:今日のひとこと
Development Slack Workspace: アプリをインストールしたい組織を選択
```

#### 2.Basic Information を開き、 `Display Information` の内容を任意の内容で変更する
```
例）
App Name: 今日のひとこと
Short description: 今日のひとこと
App icon & Preview: 任意のアイコン
Background color: 任意のカラー
```
 
#### 3. App Home を開き、Your App’s Presence in Slackを入力する
```
例）
Display Name:今日のひとこと
Default username: how_are_you_today
```

#### 4.OAuth Tokens & Redirect URLs を開き、以下Scopesを追加する
 - `chat:write`
 - `users:read`
 - `files:write`


#### 5.Interactivity & Shortcuts を開き、`Interactivity` を ON に変更する
その後、以下の設定を行い `Save Changes`する。 
   - `Request URL` は後ほど正式に入力するとして、適当に`https://localhost` と入力する
   - `Create New Shortcut` ボタンをクリックして、ショートカットを作成する
```
例）
Where should this shortcut appear? :Global
Name:今日のひとこと
Short Description:　今日のひとこと
Callback ID: how_are_you_today
```

#### 6.Install App を開き、 `Install Appto Workspace` ボタンをクリックして組織にへインストールする

一度、インストールすると、それ以後、APIの各設定を変更状況に応じて、Reinstall を求められるため、メッセージに応じて`Reinstall App` ボタンをクリッックして、再インストールする

#### 7.インストールが完了したら、以下ページのトークンを別途メモしておく
 - `Bot User OAuth Access Token` 
   - `runtimeconfig.json`ファイルの`"token"`に記載必要な情報
   - Install Appを開くと表示あり
 - `Signing Secret` 
   - runtimeconfig.json`ファイルの`"signing_secret"`に記載必要な情報
   - Basic Informationを開くと、App Credentialsに記載あり。showボタンの押下で閲覧可能
 
#### 8.SlackのチャンネルにAppを追加する
 1. 任意のチャンネルを開き、[詳細]を開く
 2. [その他]を選択し、[アプリを追加する]を選択する
 3. リストから[今日のひとこと]を探して、[追加]ボタンをクリックして追加する
 
 
## ローカル開発

事前準備として、ngrokコマンドをローカルから実行できるようにインストールしておく
 - [ngrok](https://ngrok.com/)
 

#### 1.runtimeconfig.jsonファイルを生成

```
cp functions/.runtimeconfig.json.example functions/.runtimeconfig.json
```

`functions/.runtimeconfig.json` を適切に設定する
 - "channel" : 「今日のひとこと」を投稿するチャンネル名
 - "token" : Slack APIページ上記載の`Bot User OAuth Access Token` 
 - "signing_secret" : Slack APIページ上記載の`Signing Secret` 



#### 2.npm パッケージのインストール
```
cd functions
npm install
```

#### 3.ローカルーサーバーの実行

```
npm run run-local
```

#### 4.ngrokを利用しローカルサーバーを外部公開
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

#### 5.外部公開URLを `Request URL`へ設定
```
<ngrokのURL>/how-are-you-today-bot/us-central1/shortcut
```
 - `Request URL` は、Interactivity & Shortcuts を開き、`Interactivity` が ON の時に、設定できるパラメータである
 - 上記出力ケースの場合、以下のような値を`Request URL`へ設定
    - `https://xxxxxxxxxxxxxx.ngrok.io/how-are-you-today-bot/us-central1/shortcut`
    
#### 以上で、ローカルサーバーの情報を元に動作検証しながらアプリ実行可能


## 本番デプロイ

事前準備

```
firebase functions:config:set slack.token=<ボットのアクセストークン>
firebase functions:config:set slack.channel=<投稿先のチャンネル名>
```
