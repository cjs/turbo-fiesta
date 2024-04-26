const db = require('../database/db');
const { insertProduct, getProductById, getAllProducts, updateProduct, deleteProduct } = db;

describe('CRUD operations on products table', () => {
  beforeAll(async () => {
    // Setup database for testing
    await db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, product_id INTEGER NOT NULL)');
  });

  afterAll(async () => {
    // Clean up database after tests
    await db.run('DROP TABLE IF EXISTS products');
  });

  test('Insert product into database', async () => {
    const result = await insertProduct('2021-04-01', 1);
    expect(result).toHaveProperty('id');
  });

  test('Retrieve a product by ID from database', async () => {
    const insertResult = await insertProduct('2021-04-02', 2);
    const product = await getProductById(insertResult.id);
    expect(product).toEqual({ id: insertResult.id, date: '2021-04-02', product_id: 2 });
  });

  test('Retrieve all products from database', async () => {
    await insertProduct('2021-04-03', 3);
    const products = await getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  test('Update a product in the database', async () => {
    const insertResult = await insertProduct('2021-04-04', 4);
    const updateResult = await updateProduct(insertResult.id, '2021-04-05', 5);
    expect(updateResult).toHaveProperty('changes', 1);
  });

  test('Delete a product from the database', async () => {
    const insertResult = await insertProduct('2021-04-06', 6);
    const deleteResult = await deleteProduct(insertResult.id);
    expect(deleteResult).toHaveProperty('changes', 1);
  });
});
