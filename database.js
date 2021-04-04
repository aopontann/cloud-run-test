const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("nijisanji_songs_video", "root", "pass1234", {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

(async()=>{
  const rows = await sequelize.query('select * from Videos');
  console.log(rows);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;