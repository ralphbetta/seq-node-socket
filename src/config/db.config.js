require('dotenv').config();

const enviromentalConfig = {
    development: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "",
        DB: "testdb",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "",
        DB: "testdb",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "xyz",
        DB: "testdb",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

module.exports = enviromentalConfig;