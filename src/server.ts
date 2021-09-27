import app from "./app";

const port = process.env.PORT || 8080; // port番号を指定

app.listen(port);
console.log('niji-song-server port ' + port);