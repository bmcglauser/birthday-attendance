if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const cors = require("cors");
const router = require("./router");
const db = require("./models");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

app.use("/api", router);

// if (process.env.NODE_ENV === "production") {
console.log("SERVING STATIC");
app.use(express.static(path.resolve(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build"));
});
// }

(async () => {
  db.sequelize.sync().then(() => {
    console.log(`connected to Sequelize on 5432`);
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  });
})();
