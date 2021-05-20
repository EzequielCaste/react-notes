const express = require('express');
const cors = require('cors');
const app = express();
const conectarDB = require('./config/db');
const session = require('express-session');
app.use(cors());
app.use(express.json());

conectarDB();

const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: '123jsdf8sdf@',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => console.log('server up'));
