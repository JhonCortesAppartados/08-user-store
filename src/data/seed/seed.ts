import { envs } from "../../config";
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from "../mongo";
import { seedData } from "./data";


(async() => {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
});

//Esta funciones para poder generar numero aleatorios, dependiendo del rango que queremos:
const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x);
}


async function main(){

    //0. Limpiar la base de datos:
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    //1. Crear los usuarios:
    const users = await UserModel.insertMany(seedData.users);

    //2. Crear las categorias:
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {

            return {
                ...category,
                user: users[0]._id
            }

        })
    );

    //3. Crear los productos:
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {

            return {
                ...product,
                //Se utiliza la funcion randomBetween0AndX para poder obtener un numero aleatorio entre 0 y el largo de la base de datos:
                //Para poder obtener un usuario aleatorio de la base de datos, y simular que difrerentes usuarios crearon varios productos en diferentes categorias:
                user: users[randomBetween0AndX(seedData.users.length)]._id,
                category: categories[randomBetween0AndX(seedData.categories.length)]._id
            }

        })
    );
    

    console.log('SEEDED DATA');
}


