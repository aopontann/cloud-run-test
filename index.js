const express = require('express');
const app = express();

const knex = require('./database');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

app.get('/words', async (req, res) => {
  const words = await knex.select('*').from('entries').orderBy('guestName');
  res.json({ status: 'ok', data: [...words] });
});