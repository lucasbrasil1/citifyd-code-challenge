import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Product";
import { Store } from "../../entity/Store";
import { ProductInput, ProductUpdate } from "./input/product-inputs";
import { ProductService } from "./service/product-service";

@Resolver(Product)
export class ProductResolver {

    constructor(
        private productService = new ProductService(
            AppDataSource.getRepository(Product),
            AppDataSource.getRepository(Store)
        )
    ) { }

    @Query(() => [Product])
    async allProducts() : Promise<Product[]> {
        return await this.productService.getAll();
    }

    @Query(() => [Product])
    async allProductsFor(
        @Arg('storeId') storeId: number
    ) : Promise<Product[]> {
        return await this.productService.getAllByStore(storeId);
    }

    @Query(() => Product)
    async getProduct(
        @Arg('id') id : number
    )  : Promise<Product>{
        return await this.productService.getOne(id);
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg('data') data: ProductInput
    ) : Promise<Product> {
        return await this.productService.create(data);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg('data') data : ProductUpdate
    ) : Promise<Product> {
        return this.productService.update(data);
    }

    @Mutation(() => String)
    async deleteProduct(
        @Arg('id') id: number
    ) : Promise<String> {
        return this.productService.delete(id);
    }

    @FieldResolver()
    async store(@Root() product: Product): Promise<Store> {
        return this.productService.getStore(product.getStoreId());
    }
}