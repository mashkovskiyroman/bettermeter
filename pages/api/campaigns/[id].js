const sqlite3 = require('sqlite3');
const sqlite  = require('sqlite');
const config = require('../../../config');

export default async function campaignHandler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const {name, destination, type, code} = typeof req.body === 'string' && req.body.length ? JSON.parse(req.body) : req.body;

  const db = await sqlite.open({
    filename: `./${config.db_name}`,
    driver: sqlite3.Database
  });

  switch (method) {
    case 'GET':
      const campaign = await db.get('SELECT * FROM Campaigns WHERE id = ? ', [id]);
      if (campaign) {
        return res.status(200).json(campaign)
      } else {
        return res.status(404).json({ message: "Campaign with this id not found!"})
      }
    case 'PUT':
      try {
        const statement = await db.prepare(
          'UPDATE Campaigns SET name = ?, destination = ?, type = ?, code = ? WHERE id = ?'
        );
        await statement.run(
          name, destination, type, code, id
        );
        const updatedCampaign = await db.get('SELECT * FROM Campaigns WHERE id = ? ', id);
        return res.status(200).json(updatedCampaign);
      } catch (error) {
        return res.status(500).json(error);
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({message: `Method ${method} Not Allowed`})
  }
}
