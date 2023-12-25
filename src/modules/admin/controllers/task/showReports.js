const { selectQueries } = require("../../../../contants/queries/selectQueries");
const { failure, successfuly } = require("../../../../contants/response");
const { dbHelper } = require("../../../../helpers/dbHelper");

const showReports = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const reports = await dbHelper(selectQueries.selectReports, req.id);
            let i;
            for(i=0;i<reports.length;i++){
                const worker = await dbHelper(selectQueries.selectWorkersWithId,reports[i].worker_id);
                reports[i].worker_email = worker[0].email
            }
            const response = {
                code: successfuly.repots_showing.code,
                message: successfuly.repots_showing.message,
                status: successfuly.repots_showing.status,
                reports: reports
            }
            resolve(response);
        } catch (error) {
            console.log(error)
            resolve(failure.server_error);
        }
    })
}
module.exports = showReports;