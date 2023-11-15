const crypto = require('crypto');

function generateRandomKey() {
  const key = crypto.randomBytes(32); // Generate a 32-byte (256-bit) random key
  return key.toString('base64'); // Convert the key to a Base64-encoded string 
}

const randomKey = generateRandomKey();
console.log(randomKey);