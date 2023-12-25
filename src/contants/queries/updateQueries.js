const updateQueries = {
    updateTaskStatus: 'UPDATE tasks SET status = ? WHERE id = ?',
    updateTaskBody: 'UPDATE tasks SET body = ?, panding = true, report = false WHERE id = ?',
    updateTaskPanding: 'UPDATE tasks SET panding = ? WHERE id = ?',
    updateTaskReport: 'UPDATE tasks SET report_body = ?, report_date = ?, report = true WHERE id = ?',



};

module.exports = { updateQueries };