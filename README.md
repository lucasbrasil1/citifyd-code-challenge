# Typegraphql and TypeORM project

Steps to run this project:

Running locally:

1. Run `npm i` command
2. Run `npm start` command
3. Server will start on http://localhost:4000/graphql

Docker image:

docker run -p 3000:4000 -d lucas/dockernode 

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
allProductsFor(id) - return all products for a specific store
getProduct(id) - get a specific product
allPurchases() - returns all purchases and information about the store