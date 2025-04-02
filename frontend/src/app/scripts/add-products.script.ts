import { environment } from '../../environments/environment';
import { products } from './add-products';

// This script can be run using: ng run frontend:add-products
// It will add 30 luxury watch products to the database

console.log('Adding products to the database...');

// Use fetch API instead of HttpClient
const apiUrl = `${environment.apiUrl}/products/batch`;

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(products)
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log('Products added successfully:', data);
})
.catch(error => {
  console.error('Error adding products:', error);
});

console.log('Script completed. Check the console for results.'); 