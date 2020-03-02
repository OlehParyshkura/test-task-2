// dependencies
const express = require('express');
const log = require('./app/routes/middleware/log')


// app initialization
const serverConfig = require('./config/server');
const app = express();

// connect database
require('./app/database/connection/mongoose');

app.use(express.json());
// // routers
app.use(log);
let usersRoutes = require('./app/routes/api/users');
app.use('/api', usersRoutes);
app.use(express.static('app/react-front/build'));
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`)