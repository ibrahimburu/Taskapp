const { selectQueries } = require("../../../../contants/queries/selectQueries");
const { successfuly, failure } = require("../../../../contants/response");
const { dbHelper } = require("../../../../helpers/dbHelper");

const showTask = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            console.log(req.id)
            const tasks = await dbHelper(selectQueries.selectTasksForUserHompage, req.id);
            const response = {
                code: successfuly.repots_showing.code,
                message: successfuly.repots_showing.message,
                status: successfuly.repots_showing.status,
                reports: tasks
            }
            resolve(response);
        } catch (error) {
            console.log(error)
            resolve(failure.server_error);
        }
    })
}
module.exports = showTask;