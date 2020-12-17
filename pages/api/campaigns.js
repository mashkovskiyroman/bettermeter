const sqlite3 = require('sqlite3');
const sqlite  = require('sqlite');
const config = require('../../config');

export default async function handler(req, res) {
  const {
    method
  } = req;
  const {name, destination, type, code} = typeof req.body === 'string' && req.body.length ? JSON.parse(req.body) : req.body;
  const db = await sqlite.open({
    filename: `./${config.db_name}`,
    driver: sqlite3.Database
  });
  switch (method) {
    case 'GET':
      try {
        const campaigns = await db.all('SELECT * FROM Campaigns');
        return res.status(200).json(campaigns);
      } catch (error) {
        return res.status(500).json(error);
      }
    case 'POST':
      const statement = await db.prepare(
        'INSERT INTO Campaigns (name, destination, type, code) values (?, ?, ?, ?)'
      );
      try {
        const result = await statement.run(
          name, destination, type, code
        );
        return res.status(201).json({message: 'Success', recordId: result.lastID});
      } catch (error) {
        return res.status(500).json(error);
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({message: `Method ${method} Not Allowed`});
  }

}
