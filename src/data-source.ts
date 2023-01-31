import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "mydb.sqlite",
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entity/*.*'],
    migrations: [],
    subscribers: [],
    dropSchema: true
})
