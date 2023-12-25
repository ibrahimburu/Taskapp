const { v1: uuidv1 } = require('uuid');
const { failure, successfuly } = require('../../../../contants/response');
const { dbHelper } = require('../../../../helpers/dbHelper');
const { updateQueries } = require('../../../../contants/queries/updateQueries');

const updateTask = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const { report_body, report_date, task_id } = req.body;
            if (!(report_body) || !(report_date) || !(task_id)) { resolve(failure.bad_request) };
            const update = await dbHelper(updateQueries.updateTaskReport, [report_body, report_date, task_id]);
            if (update == "") { resolve(failure.server_error); return }
            resolve(successfuly.task_updated);
        } catch (error) {
            resolve(failure.server_error);
            return
        }
    })
}

module.exports = updateTask;