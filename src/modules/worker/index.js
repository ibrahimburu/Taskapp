const workerRouter = require("./routes");

const workerModule = {
    init: (app)=>{
        app.use('/api/v1',workerRouter);
    }
}

module.exports = workerModule;