// Quick test script to verify backend is working
// Run with: node test-api.js

const API_URL = process.env.HEROKU_URL || 'http://localhost:5000';

console.log(`Testing API at: ${API_URL}`);

fetch(`${API_URL}/`)
  .then(response => response.json())
  .then(data => {
    console.log('✅ Backend is working!');
    console.log('Response:', data);
  })
  .catch(error => {
    console.log('❌ Backend test failed');
    console.error('Error:', error.message);
  });
