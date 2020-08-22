const faker = require('../../node_modules/faker');
const fs = require('fs');
const path = require('path');

const data = [];

const generateAccount = () => ({
  id: faker.random.uuid(),
  name: faker.finance.accountName(),
  ammount: faker.finance.amount(0, 1000, 0),
});

for (let i = 0; i < 5; i++) {
  data.push(generateAccount());
}

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data));
