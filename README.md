# Typegraphql and TypeORM project

Steps to run this project:

Running locally:

1. Run `npm i` command
2. Run `npm start` command
3. Server will start on http://localhost:3000/graphql


QUERIES

allStores() - returns all stores and their products

{
  allStores {
    id
    name
    totalFee
    products {
      id
      name
      price
    }
  }
}

allProducts() - returns all products and their respective store information

{
  allProducts {
    name
    price
    store { 
      id
    	name
      totalFee
    }
  }
}

allProductsFor(id) - return all products for a specific store

{
  allProductsFor(storeId : 1) {
    id
    name
    price
  }
}

getProduct(id) - get a specific product

{
  getProduct(id : 1){
    name
    price
    store {
      id
      name
    }
  }
}

allPurchases() - returns all purchases and information about the store

{
  allPurchases {
    storeAmount
    productPrice
    marketplaceValue
    gatewayValue
    productName
    productId
    feeAtTheTime
    store {
      id
      name
      totalFee
    }
  }
}

MUTATIONS 

createStore(name, fee) - create a store
mutation {
  createStore(data: {
    name: "Marley Shoes", 
    # Optional (default 10) range [1-20]
    # totalFee : 9 
  }) {
    name
    totalFee
  }
}

updateStore(id, name?, totalFee?) - update store by id
mutation {
  updateStore(data: 
    { id: 1,
      # name: "Britney Shoes", 
      totalFee : 8 
    }
  ) {
    id
    name
    totalFee
  }
}

createProduct(name, price, storeId) - create a product
mutation {
  createProduct (data : {
    name : "Red Shoes",
    # price is in pennies
    price : 19990, # $199.90
    storeId : 1
  }) { 
  	id
    name
    price
    store {
      id
      name
    }
  }
}

updateProduct(id, name?, price?) - update a product by id
mutation {
  updateProduct(data: 
    { 
    	id: 3
      price : 2147483647 #Int 32b - max 2147483647
    }
  ) {
    name
    price
  }
}

deleteProduct(id) - delete a product by id
mutation {
  deleteProduct(id: 1)
}

purchase(id) - purchase product by id
mutation {
  purchase(id : 3) {
    productId
    productName
    productPrice
    storeAmount
    gatewayValue
    marketplaceValue
    feeAtTheTime
    store {
      id
      name
    }
  }
}
