# TP Report: NestJS GraphQL + Dependency Injection

## Project status

This project currently implements:

- `NotificationsModule` and `NotificationsService`
- injection of `NotificationsService` into `ReceiptsService`
- logging notifications on receipt creation and update
- GraphQL code-first setup with `autoSchemaFile`
- `CategoryCodeFirstResolver` and `ProductCodeFirstResolver`
- GraphQL input validation support for `CreateProductInput`

## Key files to show in the demo

- `src/app.module.ts`
- `src/main.ts`
- `src/notifications/notifications.module.ts`
- `src/notifications/notifications.service.ts`
- `src/receipts/receipts.module.ts`
- `src/receipts/receipts.service.ts`
- `src/graphql/graphql.module.ts`
- `src/graphql/resolvers/category.codefirst.resolver.ts`
- `src/graphql/resolvers/product.codefirst.resolver.ts`
- `src/graphql/inputs/create-product.input.ts`
- `src/graphql/schema.gql`

## Dependency Injection demo (Practice 3)

### What to explain

- `NotificationsModule` exports `NotificationsService`
- `ReceiptsModule` imports `NotificationsModule`
- `ReceiptsService` receives `NotificationsService` in its constructor
- This is module-level provider resolution in NestJS

### What to test

1. Start the app:
   - `npm run start:dev`
2. Test the protected receipt endpoint:
   - GET `http://localhost:3000/receipts`
   - Header: `x-api-key: itc-123`
3. Create a receipt:
   - POST `http://localhost:3000/receipts`
   - Body example:
     ```json
     {
       "issuedAt": "2026-06-05T12:00:00.000Z",
       "name": "Demo receipt",
       "price": 25.5
     }
     ```
4. Confirm console output:
   - `[NOTIFY] receipt_created { receiptId: ..., price: ..., name: ... }`
5. Update the receipt:
   - PATCH `http://localhost:3000/receipts/1`
   - Body example:
     ```json
     { "price": 30 }
     ```
6. Confirm console output:
   - `[NOTIFY] receipt_updated { ... }`

## GraphQL demo (Practice 4)

### GraphQL setup

The code uses code-first GraphQL with generated schema in:

- `src/graphql/schema.gql`

GraphQL endpoint:

- `http://localhost:3000/graphql`

### Playground test cases

#### Create category

```graphql
mutation {
  createCategory(name: "Electronics") {
    id
    name
  }
}
```

#### Create product

```graphql
mutation {
  createProduct(
    input: {
      name: "Test Product"
      price: 12.5
      categoryId: 1
    }
  ) {
    id
    name
    price
    category {
      id
      name
    }
  }
}
```

#### Query products

```graphql
query {
  products {
    id
    name
    price
    category {
      id
      name
    }
  }
}
```

#### Query categories

```graphql
query {
  categories {
    id
    name
  }
}
```

### Important GraphQL notes

- `createProduct` must pass a single `input` object.
- The current schema is:
  - `createProduct(input: CreateProductInput!): ProductType!`
- `CreateProductInput` now includes `class-validator` decorators so the validation pipe accepts it.

## Notes for presentation

### Working functionality

- REST receipts endpoint with notifications
- GraphQL category/product creation and query
- Code-first schema generation
- Input validation using `ValidationPipe`

### Not implemented in this repo

- `OrdersModule` and circular dependency example are not present
- The current code does not include the forwardRef/OrdersService circular dependency lab steps

## Recommended demo flow

1. Show `AppModule` and GraphQL configuration.
2. Explain `NotificationsModule` and `ReceiptsModule` DI.
3. Run REST receipt create/update and show console notify logs.
4. Open Playground and run the GraphQL mutations/queries.
5. Emphasize the required `input` wrapper for `createProduct`.

## Summary

This report covers the actual implemented TP features in `nestjs-todo`:

- dependency injection with notifications
- protected receipts REST route
- GraphQL code-first API
- validation-enabled GraphQL input type

Use this file for your presentation notes and demo script. If you want, I can also add a shorter one-page bullet summary for slides.
