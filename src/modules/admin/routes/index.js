const express = require('express');
const adminRouter = express.Router();
const login = require('../controllers/auth/login');
const { authAdmin } = require('../../../middlewares/authMiddlewares');
const { addWorker } = require('../controllers/worker/addWorker');
const createTask = require('../controllers/task/createTask');
const acceptTask = require('../controllers/task/acceptTask');
const showReports = require('../controllers/task/showReports');
const updateTask = require('../controllers/task/feedback');

//Admin Auth
adminRouter.post('/admin/login', async (req, res) => {
    const result = await login(req);
    res.status(result.code).json(result);
});

//Worker Operations
adminRouter.post('/admin/worker', authAdmin, async (req, res) => {
    const result = await addWorker(req);
    res.status(result.code).json(result);
});

//Task Operations
adminRouter.post('/admin/task', authAdmin, async (req, res) => {
    const result = await createTask(req);
    res.status(result.code).json(result);
});
adminRouter.get('/admin/task/:id', authAdmin, async (req, res) => {
    const result = await acceptTask(req);
    res.status(result.code).json(result);
});
adminRouter.get('/admin/reports', authAdmin, async (req, res) => {
    const result = await showReports(req);
    res.status(result.code).json(result);
});
adminRouter.post('/admin/fedback', authAdmin, async (req, res) => {
    const result = await updateTask(req);
    res.status(result.code).json(result);
});
module.exports = adminRouter;