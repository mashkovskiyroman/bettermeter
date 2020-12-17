const sqlite3 = require('sqlite3');
const sqlite  = require('sqlite');
const config = require('./config');

(async () => {
  const db = await sqlite.open({
    filename: `./${config.db_name}`,
    driver: sqlite3.Database
  });
  await db.migrate({force: true});
})();
