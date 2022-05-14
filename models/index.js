const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = {};

const sslOption =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgresql://localhost:5432/postgres",
  {
    logging: false,
    ...sslOption,
  }
);
//   username: 'postgres',
//   password: '',
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres',
// });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const modelImport = require(path.join(__dirname, file));
    const model = modelImport(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
