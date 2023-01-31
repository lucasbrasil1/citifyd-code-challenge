import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, Index, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Purchase } from "./Purchase";
import { Store } from "./Store";

@ObjectType()
@Entity()
@Index(['name', 'store'], { unique: true })
export class Product extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: Number

    @Field()
    @Column()
    name: String

    getName() { return this.name }

    setName(name: String) { this.name = name; }

    @Field(type => Int)
    @Column()
    price: Number

    getPrice() { return this.price }

    setPrice(price: Number) { this.price = price }

    @Field(type => Store)
    @ManyToOne(() => Store)
    store: Store
    @RelationId((product: Product) => product.store)
    storeId: Number

    getStore() { return this.store }
    setStore(store: Store) { this.store = store }

    getStoreId() { return this.storeId }
    setStoreId(storeId: Number) { this.storeId = storeId }

}