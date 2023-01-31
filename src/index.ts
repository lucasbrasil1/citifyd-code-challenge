import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from "express"
import { buildSchema } from 'type-graphql';
import { AppDataSource } from "./data-source"
import { StoreResolver } from './modules/store/store-resolver';
import { ProductResolver } from './modules/product/product-resolver';

import { PurchaseResolver } from './modules/purchase/purchase-resolver';

const main = async () => {
    const schema = await buildSchema({
        resolvers: [StoreResolver, ProductResolver, PurchaseResolver]
    });

    const apolloServer = new ApolloServer({
        schema
    })

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000/graphql");
    })

    app.get('/', (req, res) => {
        res.send("Server started on <a href='http://localhost:3000/graphql'>Apollo Express</a>")
    })

}

AppDataSource.initialize().then(() => {
    main();
}).catch(error => console.log(error))
