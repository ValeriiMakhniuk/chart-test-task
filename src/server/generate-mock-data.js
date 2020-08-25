const faker = require('../../node_modules/faker');
const fs = require('fs');
const path = require('path');

const accounts = [];

const generateAccount = () => ({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  amount: faker.finance.amount(0, 1000, 0),
});

for (let i = 0; i < 5; i++) {
  accounts.push(generateAccount());
}

const data = {
  accounts,
};

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data));
