const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const checkPrices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find().limit(5);
    console.log('Product Prices:', products.map(p => ({ name: p.name, price: p.price, originalPrice: p.originalPrice })));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkPrices();
