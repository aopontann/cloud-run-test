## アプリケーションの概要
- [にじさんじ](https://www.nijisanji.jp/members)ライバーの歌ってみた動画を集計し、ランキング化や検索など行うWEBアプリケーション
## 使用技術
- [Express](https://expressjs.com/ja/)
   - Node.js(サーバーサイドJavascriptの実行環境)での王道的な開発をスピードアップするためのフレームワークです。
- [TypeScript](https://www.typescriptlang.org/)
   - 型を使うことでバグを防いだり、ドキュメント代わりになったり、チーム開発がスムースになります。
- [ESLint](https://eslint.org/)
   - コードを分析し問題点を指摘してくれるツールです。
- [Prettier](https://prettier.io/)
   - コードフォーマッターです。改行やクォーテーションなどを統一できます。
- [postgreSQL](https://www.postgresql.org/)
   - 拡張性とSQL準拠を強調するフリーでオープンソースの関係データベース管理システム。
- [prisma](https://www.prisma.io/)
   - Node.jsのORMです。ORM及びデータベースマイグレーションツールとして利用しています。
- [Docker](https://www.docker.com/)
   - コンテナ仮想化を用いてアプリケーションを開発・配置・実行するためのオープンソースソフトウェアあるいはオープンプラットフォーム。開発環境の構築のためdocker-composeを利用しています。
## 機能一覧
- 動画情報CRUD機能
- Vtuber情報CRUD機能(DELETEは実装していない)
- Tag情報CRUD機能(UPDATEは実装していない)
- 詳細は [swagger-ui](https://storage.googleapis.com/nijisongs-swagger/dist/index.html) をみてください
## ER図
![](https://storage.googleapis.com/vtuber_image/prisma-erd.svg)
## セットアップ
1. YouYube API を取得する([YouTube APIキーの取得 (2020/03/25時点)](https://qiita.com/iroiro_bot/items/1016a6a439dfb8d21eca))
2. .envの作成
```
DATABASE_URL="postgresql://root:password@localhost:15432/nijisongs"
YOUTUBE_DATA_API_KEY=<YOUTUBE_API_KEY>
```
3. DBの起動
```
docker-compose up -d
```
4. 依存パッケージのインストール
```
npm install
```
5. テーブル作成
```
npx prisma migrate dev
```
6. テストデータ作成
```
npx prisma db seed --preview-feature
```
7. 開発環境の起動
```
npm run dev
```
