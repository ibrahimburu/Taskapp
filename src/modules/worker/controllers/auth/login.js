const { failure, successfuly } = require('../../../../contants/response');
const { insertQueries } = require('../../../../contants/queries/insertQueries');
const { dbHelper } = require('../../../../helpers/dbHelper');
const { generateRefreshToken } = require('../../../../hash/jsonWebToken');
const { selectQueries } = require('../../../../contants/queries/selectQueries');
const login = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const { email, password } = req.body;
            if (!(email) || !(password)) {
                resolve(failure.bad_request)
            }
            const worker = await dbHelper(selectQueries.selectWorkersWithEmail, email);
            if (worker == "" || undefined || null) { resolve(failure.worker_not_found); return }
            if(worker[0].password != password){resolve(failure.wrong_password); return}
            const tokenGenerateInformation = {
                id:worker[0].id,
                email:worker[0].email
            }
            const token = { token: generateRefreshToken(tokenGenerateInformation) };
            successfuly.login_successfuly['token'] = token.token;
            await dbHelper(insertQueries.addToken,token)
            resolve(successfuly.login_successfuly);
            return
        } catch (error) {
            console.error('Error in login:', error);
            resolve(failure.server_error);
        }
    })
}
module.exports = login;