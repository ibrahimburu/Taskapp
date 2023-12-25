const { failure, successfuly } = require("../../../../contants/response");
const { v1: uuidv1 } = require('uuid');
const { dbHelper } = require("../../../../helpers/dbHelper");
const { selectQueries } = require("../../../../contants/queries/selectQueries");
const { insertQueries } = require("../../../../contants/queries/insertQueries");

const addWorker = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const { email, password } = req.body;
            if (!(email) || !(password)) { resolve(failure.bad_request); return };
            const workerAlreadyExsist = await dbHelper(selectQueries.selectWorkersWithEmail, email);
            if (workerAlreadyExsist != "") { resolve(failure.worker_already_exist); return };
            const newWorker = {
                id: uuidv1(),
                email: email,
                password: password,
                status: true
            };
            const insertWorker = await dbHelper(insertQueries.addWorker,newWorker);
            if (insertWorker == "") { resolve(failure.server_error); return };
            resolve(successfuly.worker_added);
        } catch (error) {
            resolve(failure.server_error);
            return
        }
    })
}
module.exports = { addWorker };