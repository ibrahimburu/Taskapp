const { v1: uuidv1 } = require('uuid');
const { failure, successfuly } = require('../../../../contants/response');
const { dbHelper } = require('../../../../helpers/dbHelper');
const { selectQueries } = require('../../../../contants/queries/selectQueries');
const { insertQueries } = require('../../../../contants/queries/insertQueries');

const createTask = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const { title, body, worker_email } = req.body;
            if (!(title) || !(body) || !(worker_email)) { resolve(failure.bad_request) };
            let i;
            for (i = 0; i < worker_email.length; i++) {
                const worker = await dbHelper(selectQueries.selectWorkersWithEmail, worker_email[i]);
                if (worker == "") { resolve(failure.worker_not_found) };
                const worker_id = worker[0].id;
                const id = uuidv1();
                const task = {
                    id: id,
                    title: title,
                    body: body,
                    worker_id: worker_id,
                    manager_id: req.id
                }
                const addTask = await dbHelper(insertQueries.addTask, task);
                if(addTask == ""){resolve(failure.server_error);return}
            }
            resolve(successfuly.task_added);
        } catch (error) {
            resolve(failure.server_error);
            return
        }
    })
}

module.exports = createTask;