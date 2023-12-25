const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adminModule = require('./modules/admin/index');
const workerModule = require('./modules/worker');
dotenv.config();
const app = express();

app.use(express.json());
adminModule.init(app);
workerModule.init(app);
app.use(cors());
const PORT = process.env.PORT||8080
app.listen(PORT, ()=> {
    console.log(`server is running on port : ${PORT}`);
})
