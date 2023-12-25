const insertQueries = {
    addToken: 'INSERT INTO token SET ?',
    addWorker: 'INSERT INTO workers SET ?',
    addTask: 'INSERT INTO tasks SET ?'
};

module.exports = { insertQueries };