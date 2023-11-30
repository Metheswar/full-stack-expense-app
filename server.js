// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expenseRoutes);

sequelize.sync({ force: true }).then((res) => {

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
