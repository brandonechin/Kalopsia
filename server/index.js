require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const app = express();

app.use(express.json());
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

app.put('/api/update-inventory', (req, res, next) => {
  // const productId = Number(req.body.productId);
  const { newQuantity, productId, sizeSelect } = req.body;
  if (!newQuantity || !productId || !sizeSelect) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    update "inventory"
      set "quantity" = $1
     where "productId" = $2 and "size" = $3
     returning *;
  `;
  const params = [newQuantity, productId, sizeSelect];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with productId ${productId} and size ${sizeSelect}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/insert-cart', (req, res, next) => {
  // const productId = Number(req.body.productId);
  const { userIdSet, productPrice } = req.body;
  if (!userIdSet || !productPrice) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    insert into "cart" ("userId", "totalCost")
      values ($1, $2)
     returning *
  `;
  const params = [userIdSet, productPrice];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find user with userId ${userIdSet}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/new-total-cost', (req, res, next) => {
  const newTotalCost = req.body.newTotalCost.toString();
  const { cartId } = req.body;
  if (!cartId || !newTotalCost) {
    throw new ClientError(400, 'cartId must be a positive integer and newTotalCost must be a string.');
  }
  const sql = `
    update "cart"
      set "totalCost" = $1
     where "cartId" = $2
     returning *;
  `;
  const params = [newTotalCost, cartId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find cart with cartId ${cartId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/update-cart-items', (req, res, next) => {
  const { cartId, quantity, productId, sizeSelect } = req.body;
  if (!quantity || !productId || !sizeSelect) {
    throw new ClientError(400, 'productId must be a positive integer');
  }
  const sql = `
    insert into "cartItems" ("cartId", "productId", "quantity", "size")
      values ($1, $2, $3, $4)
     returning *
  `;
  const params = [cartId, productId, quantity, sizeSelect];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with productId ${productId} and size ${sizeSelect}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
