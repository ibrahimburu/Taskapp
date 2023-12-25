const selectQueries = {
    selectToken: 'SELECT * FROM token WHERE token = ?',
    selectWorkersWithEmail: 'SELECT * FROM workers WHERE email = ?',
    selectWorkersWithId: 'SELECT * FROM workers WHERE id = ?',
    selectAdminWithEmail: 'SELECT * FROM managers WHERE email = ?',
    selectReports: `SELECT * FROM tasks WHERE manager_id = ? AND report = true`,
    selectTasks: `SELECT * FROM tasks WHERE manager_id = ? AND worker_id = ? AND id = ?`,
    selectTasksForUserHompage: `SELECT * FROM tasks WHERE worker_id = ? AND status = false`
};

module.exports = { selectQueries };