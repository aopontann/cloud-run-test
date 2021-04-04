const express = require('express');
const app = express();

const sequelize = require('./database');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

app.get('/words', async (req, res) => {
  const rows = await sequelize.query('select * from videos');
  console.log(rows);
  res.send(rows);
});

/*
CREATE TABLE videos (
  videoId char(11),
  title varchar(100),
  description varchar(10000),
  publishedAt DATETIME,
  videoLength varchar(11),
  channelId char(24)
);

INSERT INTO videos VALUES(
  "-6JYcjDjzuo",
  "KING-Kanaria / covered 本間ひまわり",
  "概要欄",
  "2020-11-08 10:00:14",
  "PT2M16S",
  "UC0g1AE0DOjBYnLhkgoRWN1w"
);

CREATE TABLE Statistics (
  videoId char(11),
  viewCount INT UNSIGNED,
  likeCount INT UNSIGNED,
  dislikeCount INT UNSIGNED,
  commentCount INT UNSIGNED
);

INSERT INTO Statistics VALUES (
  "-6JYcjDjzuo",
  1111,
  33,
  22,
  11
);

CREATE TABLE Thumbnails (
  default varchar(100),
  medium varchar(100),
  high varchar(100),
  standard varchar(100),
  maxres varchar(100)
)

SELECT *
FROM videos
JOIN Statistics
ON videos.videoId = Statistics.videoId;
*/