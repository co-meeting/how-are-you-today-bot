## 事前準備(Slack API設定編)


#### 1.[Slack API: Applications](https://api.slack.com/apps) を開き、アプリを新規作成( `Create New App` )する.
```
例）
App Name:今日のひとこと
Development Slack Workspace: アプリをインストールしたい組織を選択
```

#### 2.Basic Information を開き、 `Display Information` の内容を任意の内容で変更する。
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

#### 4.OAuth Tokens & Redirect URLs を開き、以下Scopesを追加する。
 - `chat:write`
 - `users:read`
 - `files:write`


#### 5.Interactivity & Shortcuts を開き、`Interactivity` を ON に変更する。
その後、以下の設定を行い `Save Changes`する。 
   - `Request URL` は後ほど正式に入力するとして、適当に`https://localhost` と入力する。
   - `Create New Shortcut` ボタンをクリックして、ショートカットを作成する。
```
例）
Where should this shortcut appear? :Global
Name:今日のひとこと
Short Description:　今日のひとこと
Callback ID: how_are_you_today
```

#### 6.Install App を開き、 `Install Appto Workspace` ボタンをクリックして組織にへインストールする。

#### 7.インストールが完了したら、以下ページのトークンを別途メモしておく。
 - `Bot User OAuth Access Token` 
   - `runtimeconfig.json`ファイルの`"token"`に記載必要な情報
   - Install Appを開くと表示あり。
 - `Signing Secret` 
   - runtimeconfig.json`ファイルの`"signing_secret"`に記載必要な情報
   - Basic Informationを開くと、App Credentialsに記載あり。showボタンの押下で閲覧可能。
 
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
