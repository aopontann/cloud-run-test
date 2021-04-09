const DB_add_vtuber = require("../controllers/DB_add_vtuber");

async function test() {
  const result = await DB_add_vtuber();
  console.log(result);
}

test();