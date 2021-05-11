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
