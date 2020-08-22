const path = require('path');

const jsonServer = require('json-server');
const faker = require('faker');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    req.body.id = faker.random.uuid();
  }
  next();
});
server.use(router);

/**
 * @see https://github.com/typicode/json-server
 */
server.listen(4000, () => {
  console.log('JSON Server is running');
});
