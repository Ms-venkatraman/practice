const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/mysqldb');
const router = require('./routers/authRouter');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})();

app.use('/api/v1/auth', router);

app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}`);
});