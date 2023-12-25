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
            const admin = await dbHelper(selectQueries.selectAdminWithEmail, email);
            if (admin == "" || undefined || null) { resolve(failure.manager_not_found); return }
            if (admin[0].password != password) { resolve(failure.wrong_password); return }
            console.log(admin[0].id)
            const user = {
                id: admin[0].id,
                email: admin[0].email
            }
            const token = { token: generateRefreshToken(user) };
            successfuly.login_successfuly['token'] = token.token;
            await dbHelper(insertQueries.addToken, token)
            resolve(successfuly.login_successfuly);
            return
        } catch (error) {
            console.error('Error in login:', error);
            resolve(failure.server_error);
        }
    })
}
module.exports = login;