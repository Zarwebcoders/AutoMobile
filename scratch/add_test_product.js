const axios = require('axios');

const addTestProduct = async () => {
  try {
    // 1. Login to get token
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@mobex.com',
      password: 'password123'
    });
    const token = loginRes.data.token;

    // 2. Add product
    const productData = {
      name: "RIDEX 295W0003 WIPER MOTOR",
      sku: "295W0003",
      brand: "RIDEX",
      category: "Washer system",
      price: 55.25,
      originalPrice: 75.59,
      badge: "Sale",
      inStock: true,
      isFeatured: true,
      isBestDeal: true,
      isMoreToLove: true,
      image: "https://images.unsplash.com/photo-1486262715619-67b85eb19ea3?q=80&w=400",
      details: {
        weight: "3 kg",
        dimensions: "23.5 x 55 x 32 cm",
        voltage: "12V",
        fittingPosition: "Front",
        driveType: "for left-hand drive vehicles",
        opMode: "Electric",
        mpn: "295W0003",
        ean: "4059191242054"
      }
    };

    const response = await axios.post('http://localhost:5000/api/products', productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Test product added successfully:', response.data.data.name);
  } catch (err) {
    console.error('Error adding test product:', err.response?.data || err.message);
  }
};

addTestProduct();
