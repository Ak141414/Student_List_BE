const Pool = require("pg").Pool;

const connection = new Pool({
  host: "dpg-cp3p3uvsc6pc73ftds1g-a.oregon-postgres.render.com",
  port: 5432,
  ssl: true,
  user: "arivoli",
  password: "KzrMi8HZUbaXhgK6G1i7HvrYXYglecdx",
  database: "test_25w5",
});

module.exports = {
  query: (text: string, params: Object) => connection.query(text, params),
};
