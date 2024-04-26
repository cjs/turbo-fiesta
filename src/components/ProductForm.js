import React, { useState } from 'react';

function ProductForm() {
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, product_id: productId }),
      });
      if (response.ok) {
        alert('Product saved successfully!');
        setDate('');
        setProductId('');
      } else {
        alert('Failed to save the product.');
      }
    } catch (error) {
      console.error('Failed to submit the form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="productId">Product ID:</label>
      <input
        type="number"
        id="productId"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;
