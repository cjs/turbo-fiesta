# turbo-fiesta

This repository is now home to a React CRUD application that integrates with a sqlite database to store and manage data. The application is designed to store rows with the following information:
- date
- product.id

The application includes several key components:
- A form component (`ProductForm.js`) for adding and editing product entries, including fields for `date` and `product.id`.
- A list component (`ProductList.js`) to display the stored products, fetching them from the sqlite database.
- A server setup (`database.js` and `routes.js`) to handle the sqlite database connection, table creation, and CRUD API routes for product data management.

This setup ensures a seamless flow of data between the user interface and the database, allowing for efficient storage and retrieval of product information.
