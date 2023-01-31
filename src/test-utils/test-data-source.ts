import { DataSource } from "typeorm"
import { Product } from "../entity/Product"
import { Purchase } from "../entity/Purchase"
import { Store } from "../entity/Store"

export const TestDataSource = new DataSource({
    type: "sqlite",
    database: "mydb.sqlite",
    logging: false,
    entities: [
        Store, Product, Purchase
    ],
    migrations: [],
    subscribers: [],
    synchronize: true,
    dropSchema: true
})
