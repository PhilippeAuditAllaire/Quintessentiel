const mysql = require("mysql");

class MgrDbConnection {

    constructor(host, username, password, database) {

		this._connection = mysql.createConnection({
			host: host,
			user: username,
			password: password,
			database: database,
			timeout: 60000,
			port: 3306,
		    typeCast: function castField( field, useDefaultTypeCasting ) {

	        	if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

	            	var bytes = field.buffer();

	            	return( bytes[ 0 ] === 1 );

	        	}

        		return( useDefaultTypeCasting() );

   			}
		});
	}

    get connection() {
        return this._connection;
    }

}

module.exports = MgrDbConnection;