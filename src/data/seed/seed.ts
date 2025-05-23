import { envs } from "../../config";
import { MongoDatabase } from "../mongo/mongo-database"


(async() => {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
})


async function main(){


}


