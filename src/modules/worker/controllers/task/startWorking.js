const { updateQueries } = require("../../../../contants/queries/updateQueries");
const { failure, successfuly } = require("../../../../contants/response");
const { dbHelper } = require("../../../../helpers/dbHelper");

const acceptTask = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const task_id = req.params.id;
            const task = await dbHelper(updateQueries.updateTaskPanding, [false, task_id]);
            if (task == "") { resolve(failure.server_error); return }
            resolve(successfuly.task_worked);
        } catch (error) {
            resolve(failure.server_error);
        }
    })
}
module.exports = acceptTask;