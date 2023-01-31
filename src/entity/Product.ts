import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Store } from "./Store";

@ObjectType()
@Entity()
@Index(['name', 'store'], { unique: true })
export class Product extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    getName() { return this.name }

    setName(name: string) { this.name = name; }

    @Field(type => Int)
    @Column()
    price: number

    getPrice() { return this.price }

    setPrice(price: number) { this.price = price }

    @Field(type => Store)
    @ManyToOne(() => Store)
    store: Store
    @RelationId((product: Product) => product.store)
    storeId: number

    getStore() { return this.store }
    setStore(store: Store) { this.store = store }

    getStoreId() { return this.storeId }
    setStoreId(storeId: number) { this.storeId = storeId }

}