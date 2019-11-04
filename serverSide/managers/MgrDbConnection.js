const mysql = require("mysql");

class MgrDbConnection {

    constructor(host, username, password, database) {

        this._connection = mysql.createConnection({
            host: host,
            user: username,
            password: password,
            database: database
        });
    }

    get connection() {
        return this._connection;
    }

}

module.exports = MgrDbConnection;