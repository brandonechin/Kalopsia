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

let ClientError;
app.get('/api/products/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  if (!productId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    select *
      from "sneakers"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with productId ${productId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});
app.get('/api/inventory/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  if (!productId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    select *
      from "inventory"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find product with productId ${productId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});
app.post('/api/addToCart/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  if (!productId) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    update "inventory"
      set "quantity" = $1
     where "productId" = $2
     and "size" = $3

  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError(404, `cannot find product with productId ${productId}`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
