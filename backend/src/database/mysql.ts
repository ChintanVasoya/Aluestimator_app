import { createConnection } from "typeorm";
// import dotenv from "dotenv";
// import index from "../Entity";

// dotenv.config();

const mysqlDb_Credentials: any = {
    type: "mysql",
    host: "4.188.185.58",
    port: 3306,
    // host: "127.0.0.1",
    username: "root",
    password: "MJHvTAFFog",
    database: "profitguru",
    entities: [],
    synchronize: true,
    logging: false,
};

export const connectDb = async () => {
    try {
        await createConnection(mysqlDb_Credentials);
        console.log("MySQL database connected");
    } catch (error) {
        console.log("Error connecting to MySQL database:", error);
    }
};
