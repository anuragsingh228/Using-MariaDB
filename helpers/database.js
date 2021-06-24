const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

pool.getConnection((err, connection) => {
    if(err){
        console.log(err);
    }
    if(connection) connection.release();
    return ;
})

module.exports = pool;