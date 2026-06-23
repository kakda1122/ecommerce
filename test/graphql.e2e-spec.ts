// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('GraphQL e2e', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('creates a category and a product and returns products', async () => {
//     const createCategory = `
//       mutation {
//         createCategory(name: "Electronics") {
//           id
//           name
//         }
//       }
//     `;

//     const categoryRes = await request(app.getHttpServer())
//       .post('/graphql')
//       .send({ query: createCategory })
//       .expect(200);

//     expect(categoryRes.body.errors).toBeUndefined();
//     expect(categoryRes.body.data?.createCategory?.name).toBe('Electronics');
//     const categoryId = Number(categoryRes.body.data.createCategory.id);

//     const createProduct = `
//       mutation CreateProduct($input: CreateProductInput!) {
//         createProduct(input: $input) {
//           id
//           name
//           price
//           category {
//             id
//             name
//           }
//         }
//       }
//     `;

//     const productRes = await request(app.getHttpServer())
//       .post('/graphql')
//       .send({
//         query: createProduct,
//         variables: {
//           input: {
//             name: 'Test Product',
//             price: 12.5,
//             categoryId,
//           },
//         },
//       })
//       .expect(200);

//     expect(productRes.body.errors).toBeUndefined();
//     expect(productRes.body.data?.createProduct?.name).toBe('Test Product');
//     expect(productRes.body.data.createProduct.category.name).toBe('Electronics');

//     const productsQuery = `
//       query {
//         products {
//           id
//           name
//           price
//           category {
//             id
//             name
//           }
//         }
//       }
//     `;

//     const productsRes = await request(app.getHttpServer())
//       .post('/graphql')
//       .send({ query: productsQuery })
//       .expect(200);

//     expect(productsRes.body.errors).toBeUndefined();
//     expect(productsRes.body.data?.products).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           name: 'Test Product',
//           category: expect.objectContaining({ name: 'Electronics' }),
//         }),
//       ]),
//     );
//   });
// });
