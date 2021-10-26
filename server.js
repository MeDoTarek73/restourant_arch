require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json({ limit: '100mb' }));

// controllers
const restaurantsRoutes = require('./services/routes/restaurants')(app, express);
const cuisinesRoutes = require('./services/routes/cuisines')(app, express);
const usersRoutes = require('./services/routes/users')(app, express);

// server status check
app.get('/', (req, res) => {
    res.send('Server is working fine!');
});
// api routs
app.use('/api/restaurant', restaurantsRoutes);
app.use('/api/cuisine', cuisinesRoutes);
app.use('/api/user', usersRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(function(connection) {
    console.debug("Connected to : " + /[^/]*$/.exec(process.env.DB_URL)[0]);
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    });
}).catch(function(err) {
    console.log(err);
});