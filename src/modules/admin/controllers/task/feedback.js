const { v1: uuidv1 } = require('uuid');
const { failure, successfuly } = require('../../../../contants/response');
const { dbHelper } = require('../../../../helpers/dbHelper');
const { selectQueries } = require('../../../../contants/queries/selectQueries');
const { insertQueries } = require('../../../../contants/queries/insertQueries');
const { updateQueries } = require('../../../../contants/queries/updateQueries');

const updateTask = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const { body, task_id } = req.body;
            if (!(body) || !(task_id)) { resolve(failure.bad_request) };
            const update = await dbHelper(updateQueries.updateTaskBody, [body, task_id]);
            console.log(update)
            if (update == "") { resolve(failure.server_error); return }
            resolve(successfuly.task_updated);
        } catch (error) {
            resolve(failure.server_error);
            return
        }
    })
}

module.exports = updateTask;