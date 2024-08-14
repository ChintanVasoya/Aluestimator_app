import { createConnection } from "typeorm";
// import dotenv from "dotenv";
import index from "../entity";

// dotenv.config();

const mongoDb_Credentials: any = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "apiTrainning",
    entities: index,
    synchronize: true,
    logging: false,
    useUnifiedTopology: true, // This is often needed for MongoDB connections
};

export const connectDb = async () => {
    try {
        await createConnection(mongoDb_Credentials);
        console.log("db connected");
    } catch (error) {
        console.log(error);
    }
};
