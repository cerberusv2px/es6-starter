
module.exports = {
  development: {
    client: 'mysql',
    connection: 'jdbc:mysql://localhost:3306/nodemysql',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  }
};