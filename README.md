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
- aaa
## インフラ構成図
## ER図
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
5. 開発環境の起動
```
npm run dev
```
## 参考サイト
- [YouTube APIキーの取得 (2020/03/25時点)](https://qiita.com/iroiro_bot/items/1016a6a439dfb8d21eca)
- [prisma](https://www.prisma.io/)
- [さくらのナレッジ Docker入門](https://knowledge.sakura.ad.jp/13265/)
