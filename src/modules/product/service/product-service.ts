import { Equal, Repository } from "typeorm";
import { Product } from "../../../entity/Product";
import { Store } from "../../../entity/Store";
import { ProductInput, ProductUpdate } from "../input/product-inputs";

export class ProductService {

    constructor(
        private readonly productRepository: Repository<Product>,
        private readonly storeRepository: Repository<Store>
    ) { }

    async getAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getOne(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id : Equal(Number(id)) });
    }

    async getAllByStore(storeId: number): Promise<Product[]> {
        const store: Store = await this.storeRepository.findOneBy({ id: Equal(Number(storeId)) })
        if (!store) { throw new Error("Store Id Not Found!") }
        return this.productRepository.find({relations : ["store"], where: {store : Equal(Number(store.id))}})
    }

    async create({ name, price, storeId }: ProductInput): Promise<Product> {
        const store: Store = await this.storeRepository.findOneBy({ id: Equal(Number(storeId)) })
        if (!store) { throw new Error("Store Id Not Found!") }
        const product = await Product.create({ name, price, store }).save();
        return product;
    }

    async update({ id, name, price }: ProductUpdate): Promise<Product> {
        if (!name && !price) { throw new Error("No values changed!") }
        const product = await Product.findOneBy(({ id: Equal(id) }));
        if (!product) { throw new Error("Product Id Not Found!") }
        if (name) { product.setName(name); }
        if (price) { product.setPrice(price); }
        product.save();
        return product;
    }

    async delete(id: number): Promise<String> {
        const product = await Product.findOneBy(({ id: Equal(id) }));
        if (!product) { throw new Error("Product Id Not Found!") }
        await product.remove();
        return `Product ${product.getName()} was succesfully deleted`;
    }

    async getStore(storeId: number): Promise<Store> {
        return await this.storeRepository.findOne({ where: { id: Equal(storeId) }, cache: 1000 });
    }

}