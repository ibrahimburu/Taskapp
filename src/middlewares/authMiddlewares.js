const jwt = require('jsonwebtoken');
const { failure } = require('../contants/response');
const { dbHelper } = require('../helpers/dbHelper');
const { selectQueries } = require('../contants/queries/selectQueries')
const { deleteQueries } = require('../contants/queries/deleteQueries');
require('dotenv').config();
const authworker = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        try {
            const tokenexist = await dbHelper(selectQueries.selectToken, token);
            if (tokenexist == '') {
                res.status(failure.you_must_be_login.code).json(failure.you_must_be_login);
                return
            } else {
                const decoded = jwt.verify(token, process.env.SCREETKEY);
                req.id = decoded.id;
                req.email = decoded.email;
                const userExist = await dbHelper(selectQueries.selectWorkersWithEmail, decoded.email);
                if (userExist == "") {
                    await dbHelper(deleteQueries.deleteToken, token)
                    res.status(failure.you_must_be_login.code).json(failure.you_must_be_login);
                    return
                }
                next();
            }
        } catch (error) {
            res.status(failure.server_error.code).json(failure.server_error);
        }
    } else {
        res.json(failure.you_must_be_login);
    }

}
const authAdmin = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        try {
            const tokenexist = await dbHelper(selectQueries.selectToken, token);
            if (tokenexist == '') {
                res.status(failure.you_must_be_login.code).json(failure.you_must_be_login);
                return
            } else {
                const decoded = jwt.verify(token, process.env.SCREETKEY)
                req.id = decoded.id;
                req.email = decoded.email;
                const adminExist = await dbHelper(selectQueries.selectAdminWithEmail, decoded.email);
                if (adminExist == "") {
                    await dbHelper(deleteQueries.deleteToken, token)
                    res.status(failure.you_must_be_login.code).json(failure.you_must_be_login);
                    return
                }
                next();
            }
        } catch (error) {
            res.status(failure.server_error.code).json(failure.server_error);
        }
    } else {
        res.json(failure.you_must_be_login);
    }

}
module.exports = { authworker ,authAdmin};