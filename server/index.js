require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const app = express();

app.use(staticMiddleware);
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/kalopsia',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/sneakers', async (req, res, next) => {
  const sql = `
  select *
  from "sneakers"
  `;
  try {
    const sneakers = await db.query(sql);
    res.json(sneakers);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
