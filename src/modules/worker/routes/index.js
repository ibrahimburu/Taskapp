const express = require('express');
const login = require('../controllers/auth/login');
const showTask = require('../controllers/task/showTask');
const { authworker } = require('../../../middlewares/authMiddlewares');
const updateTask = require('../controllers/task/report');
const acceptTask = require('../controllers/task/startWorking');
const workerRouter = express.Router();

//login
workerRouter.post('/worker/login', async (req, res) => {
    const result = await login(req);
    res.status(result.code).json(result);
})


//showHompage
workerRouter.get('/worker/task', authworker, async (req, res) => {
    const result = await showTask(req);
    res.status(result.code).json(result);
})
//startTask
workerRouter.get('/worker/task/panding/:id', authworker, async (req, res) => {
    const result = await acceptTask(req);
    res.status(result.code).json(result);
})
//taskReport
workerRouter.post('/worker/task/report', authworker, async (req, res) => {
    const result = await updateTask(req);
    res.status(result.code).json(result);
})


module.exports = workerRouter;