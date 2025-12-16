const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const commentRoutes = require('./routes/commentRoutes.js');



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



app.get('/', (req, res) => {
  res.json({ message: 'Viadeo is running' });
});

app.use('/api/comments', commentRoutes);


module.exports = app;