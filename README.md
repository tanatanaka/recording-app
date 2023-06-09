# トレコード(トレーニング・体重管理アプリ) 
  
  
## アプリ URL
https://recording-app.vercel.app/

## アプリ概要
健康や美容のためにトレーニングをする方が、日々のトレーニング・体重・体脂肪率を簡単に記録し管理できるアプリです。  
目標を設定することが可能なため、ゴールまでの日数や数値も明確にできます。
  

## アプリを作成した背景
美容目的で様々な運動に取り組んできましたが、その中で下記の悩みを持つようになりました。
1. 毎日同じトレーニングをしているわけではなかったため、トレーニングの種類、効果の出方、数値の変化の仕方などが分かりにくく自分に合うトレーニングの選定がしにくい。
2. 体重や体脂肪率の変化がスローペースであったため、変化を実感しにくくモチベーション維持が難しい。
3. 長期的になると目標を決めていても近づいている感覚がない。

そのため、トレーニングや数値を記録した上で、グラフにして推移を可視化し、目標までの数値をカウントダウンのように見ることができれば解決できると感じました。  
同じような悩みを持つ方の手助けができればと思い、開発に至りました。

  
## テスト用アカウント
* メールアドレス：test@test.com
* パスワード　　：testuser

  
## PC画面
| トップページ  | マイページ |
| ------------- | ------------- |
|<img width="1128" alt="スクリーンショット 2023-04-25 225731" src="https://user-images.githubusercontent.com/123450999/234304998-090da12a-e758-4afa-91dd-b03d133394b7.png"> | <img width="1128" alt="スクリーンショット 2023-04-25 224717" src="https://user-images.githubusercontent.com/123450999/234305196-6c6863ab-c802-4a58-bbbf-212dad835d72.png"> |


| トレーニング一覧 | グラフ |
| ------------- | ------------- |
| <img width="1128" alt="スクリーンショット 2023-04-25 225209" src="https://user-images.githubusercontent.com/123450999/234306816-09767ed1-f0fe-4d10-b300-00a3aada992b.png">|<img width="1128" alt="スクリーンショット 2023-04-25 224810" src="https://user-images.githubusercontent.com/123450999/234305903-0531644a-a9c5-463f-9332-9e62bd197bdc.png"> |

## モバイル画面
| トップページ  | マイページ |
| ------------- | ------------- |
|<img width="374" alt="スクリーンショット 2023-04-25 232826" src="https://user-images.githubusercontent.com/123450999/234309880-5a9b4ea6-a5f3-433b-95e8-8d02f547f809.png"> | <img width="376" alt="スクリーンショット 2023-04-25 232905" src="https://user-images.githubusercontent.com/123450999/234309957-22b3bd83-6828-43e6-8521-de7b1d5e0e2b.png">|


| トレーニング一覧 | グラフ |
| ------------- | ------------- |
| <img width="386" alt="スクリーンショット 2023-04-25 232933" src="https://user-images.githubusercontent.com/123450999/234310003-1511232d-ccfc-4c87-b5f5-b2e4d755a370.png">|<img width="388" alt="スクリーンショット 2023-04-25 233000" src="https://user-images.githubusercontent.com/123450999/234310073-fdf7c4b9-9565-4000-a2a1-9a7627c5da2f.png">|


  
## 機能一覧
* 認証（サインアップ/ログイン/ログアウト）
* 各種データ登録/編集･更新/削除
* トレーニング一覧
* チャート（グラフデータ）
* 目標までの数値一覧
  

## 実装予定の機能
* パスワードリセット機能
* ヘルプ(使い方)ボタンの作成
* グラフ・トレーニングの月単位選択表示
  

## 開発環境
### フロントエンド
* React(v18.2.0)
* Typescript
* day.js(v1.11.7)
* chart.js(v4.2.1)
* react-chartjs-2(v5.2.0)
* Material UI

  
### バックエンド
* Firebase (v9.19.1)

  
### デプロイ
* Vercel

  
## 工夫した点
* トレーニング登録・編集の際にボタンクリックで入力フォームの増減が出来るように実装しました。
* 体重と体脂肪率を一つのグラフにまとめ、推移を一目見て分かるように実装しました。


## 現在発生している不具合
* iOSにおいてsignInWithRedirectを用いてのGoogleアカウント認証ができない→signInWithPopupに変更して対応  
(signInWithPopupはデバイスやプラットフォームによってブロックされることがあり推奨されていないため一時的に使用しています。現在、調査・修正対応中です。)
