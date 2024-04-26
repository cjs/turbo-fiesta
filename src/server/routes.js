const express = require('express');
const router = express.Router();
const db = require('./database');

// Get all products
router.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get single product by id
router.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        message: 'success',
        data: row
      });
    } else {
      res.json({
        message: 'not found'
      });
    }
  });
});

// Create new product
router.post('/api/products', (req, res) => {
  const { date, product_id } = req.body;
  db.run('INSERT INTO products (date, product_id) VALUES (?, ?)', [date, product_id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: this.lastID
    });
  });
});

// Update product
router.put('/api/products/:id', (req, res) => {
  const { date, product_id } = req.body;
  const id = req.params.id;
  db.run('UPDATE products SET date = ?, product_id = ? WHERE id = ?', [date, product_id, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: this.changes
    });
  });
});

// Delete product
router.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM products WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'deleted',
      changes: this.changes
    });
  });
});

module.exports = router;
