## アプリケーションの概要
- [にじさんじ](https://www.nijisanji.jp/members)ライバーの歌ってみた動画を集計し、ランキング化など行うWEBアプリケーション
## 使用技術
- express
- JavaScript
- Prettier
- MySQL
- prisma
- Docker
- Jest
## 機能一覧
- 指定されたチャンネルIDと期間から、アップロードされた動画IDを取得
- 動画IDから、詳細動画データを取得(全動画 or 歌ってみた動画か判定された動画)
- 詳細動画データから、その動画に出演しているにじさんじライバーを取得
- 詳細動画データのCRUD機能
- にじさんじライバーデータのCRUD機能
## インフラ構成図
## ER図
![](https://storage.googleapis.com/vtuber_image/prisma-erd.svg)
## セットアップ
1. YouYube API を取得する
2. .envの作成
```
DATABASE_URL="mysql://root:password@localhost:3306/nijisongs"
YOUTUBE_DATA_API_KEY=<YOUTUBE_API_KEY>
```
3. API/DBの起動
```
docker-compose up -d
```
4. 依存パッケージのインストール
```
npm install
```
5. テーブル作成
```
npx prisma migrate dev --name init
```
6. テストデータ作成
```
npx prisma db seed --preview-feature
```
7. 開発環境の起動
```
npm run dev
```
## 参考サイト
- [YouTube APIキーの取得 (2020/03/25時点)](https://qiita.com/iroiro_bot/items/1016a6a439dfb8d21eca)
- [prisma](https://www.prisma.io/)
- [さくらのナレッジ Docker入門](https://knowledge.sakura.ad.jp/13265/)
