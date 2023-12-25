const adminRouter = require('./routes/index.js');

const adminModule = {
    init: (app)=>{
        app.use("/api/v1", adminRouter);
    }
}

module.exports = adminModule;