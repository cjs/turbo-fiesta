const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Create a table for products with columns for date and product.id
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  product_id INTEGER NOT NULL
)`, (err) => {
  if (err) {
    console.error('Error creating table', err.message);
    return;
  }
  console.log('Table "products" created or already exists.');
});

// Implement functions to perform CRUD operations on the 'products' table
const insertProduct = (date, product_id, callback) => {
  db.run('INSERT INTO products (date, product_id) VALUES (?, ?)', [date, product_id], function(err) {
    callback(err, { id: this.lastID });
  });
};

const getProductById = (id, callback) => {
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

const getAllProducts = (callback) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    callback(err, rows);
  });
};

const updateProduct = (id, date, product_id, callback) => {
  db.run('UPDATE products SET date = ?, product_id = ? WHERE id = ?', [date, product_id, id], function(err) {
    callback(err, { changes: this.changes });
  });
};

const deleteProduct = (id, callback) => {
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    callback(err, { changes: this.changes });
  });
};

module.exports = {
  insertProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct
};
